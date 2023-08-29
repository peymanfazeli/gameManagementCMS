const { Router } = require("express");

const User = require("../DB/schemas/user");
const { decreaseCup, calculateUserScore } = require("../Utils/helper");

const minesweeperRouter = Router();
minesweeperRouter.get("/", (request, response) => {
  if (request.user) {
    let user = request.user;
    let userName = user.userName;
    let prevClick = user.minesweeper[0].clickNumber;
    let prevTime;
    console.log(request.user);
    response.json({ user: user });
  } else {
    response.sendStatus(200);
  }
});
minesweeperRouter.get("/:level", (request, response) => {
  const { level } = request.params;
  // if(level==='Beginner')
  // if (request.user) {
  //   let user = request.user;
  //   let userName = user.userName;
  //   let prevClick = user.minesweeper[0].clickNumber;
  //   let prevTime;
  //   console.log(request.user);
  //   response.json({ user: user });
  // } else {
  //   response.sendStatus(200);
  // }
});
minesweeperRouter.post("/", async (request, response) => {
  let { remainedMineNum, winIndex, winningBy, levelToPost, winner } =
    request.body;
  let cupIndex = 0;
  let scoreIndex = "";
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
      " is winner",
      winner,
      " cup index atfirst: ",
      cupIndex
    );
    // let playerInDb=User.findOne({_id:user._id})

    let prevClickNum = user.minesweeper[0].clickNumber;
    let prevTime = user.minesweeper[0].timer;
    let prevCup = user.cup;
    console.log("click Base game: ", prevClickNum);
    console.log("timer Base game: ", prevTime);
    console.log("prev cup in server: ", prevCup);

    if (levelToPost === "Beginner" && winningBy === "click") {
      if (winner) {
        if (winIndex > 0 && winIndex <= 3) {
          cupIndex = cupIndex + 9;
          console.log("win index=", winIndex, "and cupIndex is:", cupIndex);
        } else if (winIndex > 3 && winIndex <= 6) {
          cupIndex = cupIndex + 6;
          console.log("win index=", winIndex, "and cupIndex is:", cupIndex);
        } else if (winIndex > 6 && winIndex <= 9) {
          cupIndex = cupIndex + 3;
          console.log("win index=", winIndex, "and cupIndex is:", cupIndex);
        } else if (winIndex > 9) {
          cupIndex = cupIndex + 1;
          console.log("win index=", winIndex, "and cupIndex is:", cupIndex);
        }
        console.log("cups after checking: ", cupIndex);

        if (prevClickNum > winIndex) {
          console.log("cups clickBase in updating: ", cupIndex);
          console.log("prev cup in checking: ", prevCup);
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
                    // cup: prevCup + cupIndex,
                  },
                ],
                cup: prevCup + cupIndex,
                score: calculateUserScore(prevCup, cupIndex),
              },
            }
          );
          response.json({
            addedCup: cupIndex,
            totalCup: user.minesweeper[0].cup,
          });
        } else {
          response.json({
            msg: "clickBased winning but record is not changed",
          });
        }
      } else {
        response.json({ lostGame: "ok" });
        return decreaseCup(user, winIndex, prevTime, prevCup, prevClickNum);
      }
    } else if (levelToPost === "Harder" && winningBy === "timer") {
      cupIndex = 0;
      if (winner) {
        if (winIndex > 100 && winIndex <= 120) {
          cupIndex = cupIndex + 9;
        } else if (winIndex > 80 && winIndex <= 100) {
          cupIndex = cupIndex + 6;
        } else if (winIndex > 60 && winIndex <= 80) {
          cupIndex = cupIndex + 3;
        } else if (winIndex < 60) {
          cupIndex = cupIndex + 1;
        }
        console.log("cups timerBase: ", cupIndex);
        if (prevTime < winIndex) {
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
                    // cup: prevCup + cupIndex,
                  },
                ],
                cup: prevCup + cupIndex,
                score: calculateUserScore(prevCup, cupIndex),
              },
            }
          );
          response.json({
            addedCup: cupIndex,
            totalCup: user.cup,
          });
        } else {
          response.json({
            msg: "time Based winning but record is not changed",
          });
        }
      } else {
        response.json({ lostGame: "ok" });
        return decreaseCup(user, winIndex, prevTime, prevCup, prevClickNum);
      }
    }
  } else {
    console.log("Guest User");
    response.json({ msg: "Guest User" });
  }
});
module.exports = minesweeperRouter;
