const { Router } = require("express");

const categories = require("../DB/schemas/categories");
const User = require("../DB/schemas/user");

const ctgRouter = Router();

ctgRouter.get("/", async (request, response) => {
  let allCategories = await categories.find();
  let userCategories = request.user.ctg;
  userCategories.remove(0);
  // await User.updateOne({ _id: request.user._id }, { $pop: { ctg: 1 } });
  response.send({ allCtg: allCategories, userCtg: userCategories });
});
ctgRouter.get("/adminCtg", async (request, response) => {
  let allCategories = await categories.find();
  // let userCategories = request.user.ctg;
  // userCategories.remove(0);
  // await User.updateOne({ _id: request.user._id }, { $pop: { ctg: 1 } });
  response.json({ allCtg: allCategories });
});

ctgRouter.post("/ctgUpdate", async (request, response) => {
  const oldCtg = request.user.ctg;
  const { newCategory } = request.body;
  console.log("old ctg: ", oldCtg);
  console.log("new ctg: ", newCategory);

  const _id = newCategory._id;
  console.log("ctg Id in ctg router: ", _id);
  const ctgInDb = await categories.findOne({ _id });
  console.log("ctg in db:", ctgInDb);
  const name = ctgInDb.name;
  // await User.updateOne({ ctg: request.user.ctg }, { ctg: { _id, name } });
  let isRedundantSimple = request.user.ctg.findIndex(
    (ctg) => ctg._id === newCategory._id
  );
  let isRedundantInDb = await User.find({ ctg: newCategory });
  if (isRedundantSimple === -1) {
    console.log("userCtg b4 up: ", request.user.ctg);
    await User.updateOne(
      { ctg: request.user.ctg },
      { $push: { ctg: { _id, name } } }
    );
    console.log("userCtg after up: ", request.user.ctg);
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }
  // }
});
ctgRouter.post("/addCtg", async (request, response) => {
  const { name } = request.body;
  if (name.length >= 3) {
    await categories.create({ name });
    const allCtgs = await categories.find();
    response.send({ ctgs: allCtgs });
  } else {
    response.sendStatus(404);
  }
});
module.exports = ctgRouter;
