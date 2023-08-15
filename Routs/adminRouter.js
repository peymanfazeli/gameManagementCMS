const { Router } = require("express");

const adminRoute = Router();
const User = require("../DB/schemas/user");

adminRoute.get("/", (request, response) => {
  response.send({ msg: "You are admin" });
});
adminRoute.get("/allPlayers", async (request, response) => {
  const allPlayers = await User.find();
  response.send({ players: allPlayers });
});
adminRoute.post("/grantPlayer", async (request, response) => {
  const _id = request.body;
  const playerInDb = await User.findOne({ _id });
  await User.updateMany({ _id: playerInDb._id }, { $set: { role: "admin" } });
  response.send({ player: playerInDb });
});
adminRoute.post("/disallowPlayer", async (request, response) => {
  const _id = request.body;
  const playerInDb = await User.findOne({ _id });
  await User.updateMany({ _id: playerInDb._id }, { $set: { role: "user" } });
  response.send({ player: playerInDb });
});
adminRoute.post("/deletePlayer", async (request, response) => {
  const _id = request.body;
  await User.deleteMany({ _id: _id });
  let users = await User.find();
  response.send({ user: users });
});

module.exports = adminRoute;
