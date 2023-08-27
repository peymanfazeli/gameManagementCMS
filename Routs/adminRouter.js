const { Router } = require("express");

const adminRoute = Router();
const User = require("../DB/schemas/user");

adminRoute.get("/", (request, response) => {
  if (request.user) {
    response.send({ msg: "You are admin" });
  } else {
    response.json({ unAuthCode: 1404 });
  }
});
adminRoute.get("/allPlayers", async (request, response) => {
  const allPlayers = await User.find();
  response.send({ players: allPlayers });
});
adminRoute.post("/grantPlayer", async (request, response) => {
  if (request.user) {
    const _id = request.body;
    const playerInDb = await User.findOne({ _id });
    await User.updateMany({ _id: playerInDb._id }, { $set: { role: "admin" } });
    response.send({ player: playerInDb });
  } else {
    response.json({ unAuthCode: 1404 });
  }
});
adminRoute.post("/disallowPlayer", async (request, response) => {
  if (request.user) {
    const _id = request.body;
    const playerInDb = await User.findOne({ _id });
    await User.updateMany({ _id: playerInDb._id }, { $set: { role: "user" } });
    response.send({ player: playerInDb });
  } else {
    response.json({ unAuthCode: 1404 });
  }
});
adminRoute.post("/deletePlayer", async (request, response) => {
  if (request.user) {
    const _id = request.body;
    await User.deleteMany({ _id: _id });
    let users = await User.find();
    response.send({ user: users });
  } else {
    response.json({ unAuthCode: 1404 });
  }
});

module.exports = adminRoute;
