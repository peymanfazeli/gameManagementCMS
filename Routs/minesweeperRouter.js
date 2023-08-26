const { Router, request } = require("express");

const minesweeperRouter = Router();
minesweeperRouter.get("/", (request, response) => {
  if (request.user) {
    let userName = request.user.userName;
    response.json({ user: userName });
  } else {
    response.sendStatus(200);
  }
});
minesweeperRouter.post("/", (request, response) => {
  let { remainedMineNum, winIndex, levelToPost } = request.body;
  if (!levelToPost) {
    levelToPost = "Beginner";
  }
  console.log(
    "level: ",
    levelToPost,
    "clicked num in server:",
    winIndex,
    "MinesNum in server: ",
    remainedMineNum
  );
});
module.exports = minesweeperRouter;
