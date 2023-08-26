const { Router, request } = require("express");

const User = require("../DB/schemas/user");

const minesweeperRouter = Router();
minesweeperRouter.get("/", (request, response) => {
  if (request.user) {
    let userName = request.user.userName;
    let prevC = request.user.minesweeper[0].clickNumber;
    console.log(request.user);
    response.json({ user: userName });
  } else {
    response.sendStatus(200);
  }
});
minesweeperRouter.post("/", async (request, response) => {
  let { remainedMineNum, winIndex, winningBy, levelToPost, winner } =
    request.body;
  if (request.user) {
    const user = request.user;
    if (!levelToPost) {
      levelToPost = "Beginner";
    } else {
      levelToPost = levelToPost;
    }
    console.log(
      "user is: ",
      user.userName,
      " level: ",
      levelToPost,
      " clicked num in server:",
      winIndex,
      "MinesNum in server: ",
      remainedMineNum,
      " score by: ",
      winningBy,
      "is winner",
      winner
    );
    // let playerInDb=User.findOne({_id:user._id})
    let prevClickNum = user.minesweeper[0].clickNumber;
    let prevTime = user.minesweeper[0].timer;
    console.log("click Base game: ", prevClickNum);
    console.log("timer Base game: ", prevTime);
    if (levelToPost === "Beginner" && winningBy === "click") {
      if (winner && winIndex < prevClickNum) {
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              minesweeper: [
                {
                  level: "Beginner",
                  widCondition: "click",
                  clickNumber: winIndex,
                  timer: prevTime,
                },
              ],
            },
          }
        );
        console.log("record is hit");
        response.json({ msg: "clickBased record is hit" });
      } else if (!winner) {
        console.log("game Over click based");
        response.json({ msg: "game Over click based" });
      } else {
        response.json({ msg: "clickBased winning but record is not changed" });
      }
    } else if (levelToPost === "Harder" && winningBy === "timer") {
      if (winner && winIndex > prevTime) {
        console.log("time based game record hit");
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              minesweeper: [
                {
                  level: "Harder",
                  widCondition: "timer",
                  clickNumber: prevClickNum,
                  timer: winIndex,
                },
              ],
            },
          }
        );
        response.json({ msg: "time based game record hit" });
      } else if (!winner) {
        console.log("game over time based");
        response.json({ msg: "game over time based" });
      } else {
        console.log("won time based without record");
        response.json({ msg: "timeBased winning but record is not changed" });
      }
    }
  } else {
    console.log("Guest User");
    response.json({ msg: "Guest User" });
  }
});
module.exports = minesweeperRouter;
