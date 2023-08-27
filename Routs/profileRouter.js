const { Router } = require("express");
const { ObjectId } = require("mongodb");

const profileRoute = Router();

const User = require("../DB/schemas/user");
const categories = require("../DB/schemas/categories");
// const Comments = require("../DB/schemas/comments");
const { validatePassword, hashPassword } = require("../Utils/helper");

profileRoute.get("/", async (request, response) => {
  // console.log("reques user in profileroute: ", request.user);
  response.json({ userProfile: request.user });
});
profileRoute.get("/:userId", async (request, response) => {
  const { userId } = request.params;
  console.log("user id to get player name:", userId);
  if (userId) {
    let user = await User.findOne({ _id: userId });
    return response.json({ userProfile: user });
  }
});
profileRoute.post("/update", async (request, response) => {
  if (request.user) {
    const token = request.user.token;
    const updatedUser = await User.findOne({ token: token });
    console.log("updated user in update router: ", await request.body);
    if (request.body.userName) {
      let userInDb = await User.updateOne(
        { userName: updatedUser.userName },
        { userName: request.body.userName }
      );
      return response.send({ user: userInDb });
    } else if (request.body.password) {
      let newPassword = validatePassword(request.body.password);
      if (newPassword) {
        let userInDb = await User.updateOne(
          { password: updatedUser.password },
          { password: hashPassword(request.body.password) }
        );
        return response.send({ user: userInDb });
      } else {
        return response.sendStatus(401);
      }
    }
  } else {
    response.json({ unAuthCode: 1404 });
  }
});
profileRoute.post("/ctgUpdate", async (request, response) => {
  if (request.user) {
    const oldCtg = request.user.ctg;
    const { category } = request.body;

    const _id = category._id;
    console.log("ctg Id in ctg router: ", _id);
    const ctgInDb = await categories.findOne({ _id });
    console.log("ctg in db:", ctgInDb);
    const name = ctgInDb.name;
    // await User.updateOne({ ctg: request.user.ctg }, { ctg: { _id, name } });
    let isRedundantSimple = request.user.ctg.findIndex(
      (ctg) => ctg._id === category._id
    );
    console.log(
      "isRedundantSimple: ",
      isRedundantSimple,
      "id: ",
      String(category._id)
    );
    if (isRedundantSimple === -1) {
      console.log("userCtg b4 up: ", request.user.ctg);
      await User.updateOne(
        { ctg: request.user.ctg },
        { $push: { ctg: { _id, name } } }
      );
      console.log("userCtg after up: ", request.user.ctg);
      response.send({ ctg: request.user.ctg });
    } else {
      response.sendStatus(409);
    }
  } else {
    response.json({ unAuthCode: 1404 });
  }
  // }
});
profileRoute.post("/ctgDelete", async (request, response) => {
  if (request.user) {
    const { category } = request.body;
    let _id = category._id;
    console.log("ctg to be deleted: ", category, "id: ", _id);
    console.log("user: ", request.user);
    const ctgInDb = await categories.findOne({ _id });
    const name = ctgInDb.name;

    console.log("ctg to be deleted: ", name, "id: ", _id);
    let findCtginUserDb = request.user.ctg.find(
      (ctg) => ctg._id === category._id
    );
    console.log("user db ctg: ", findCtginUserDb);
    await User.updateOne(
      { ctg: request.user.ctg },
      { $pull: { ctg: findCtginUserDb } }
    );
    response.json({ user: await User.find() });
  } else {
    response.json({ unAuthCode: 1404 });
  }
});
module.exports = profileRoute;
