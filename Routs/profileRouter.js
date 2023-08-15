const { Router, request } = require("express");
const { ObjectId } = require("mongodb");

const profileRoute = Router();

const User = require("../DB/schemas/user");
const categories = require("../DB/schemas/categories");
// const Comments = require("../DB/schemas/comments");
const { validatePassword, hashPassword } = require("../Utils/helper");

// profileRoute.get("/:email", async (req, res) => {
//   const { email } = req.params;
//   const userInDb = await User.findOne({ email });
//   if (userInDb) {
//     return res.status(200).send({ userData: userInDb });
//   } else {
//     return res.send(400);
//   }
// });
// profileRoute.get("/validate", async (request, response) => {
//   console.log("request cookie in  validate/profileRouter: ", request.cookies);
//   let token = userToken(request.cookies.Token);
//   // token[0]
//   const user = await User.findOne({ token });
//   if (user) {
//     return response.json({ user: user });
//   } else {
//     return response.sendStatus(400);
//   }
// });
profileRoute.get("/", async (request, response) => {
  response.json({ userProfile: request.user });
});
profileRoute.post("/update", async (request, response) => {
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
      return response.send({ code: 400 });
    }
  }
});
profileRoute.post("/ctgUpdate", async (request, response) => {
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
  // }
});
profileRoute.post("/ctgDelete", async (request, response) => {
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
});
module.exports = profileRoute;
