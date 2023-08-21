const { Router } = require("express");
const homeRouter = Router();

const { getCategories, findCommonElements } = require("../Utils/helper");

const User = require("../DB/schemas/user");
const Games = require("../DB/schemas/games");
const Comments = require("../DB/schemas/comments");
const Categories = require("../DB/schemas/categories");

const homeResposne = {
  ok: true,
  result: {
    homepage: { comments: [], new_games: [], slider: [], tutorials: [] },
  },
};

homeRouter.get("/", async (request, response) => {
  const allGames = await Games.find();
  const newGames = await Games.find().sort({ _id: -1 }).limit(1).limit(3);
  const userComments = await Comments.find()
    .sort({ _id: -1 })
    .limit(1)
    .limit(6);
  if (request.user) {
    let loggedinUser = request.user;
    let userCtgs = loggedinUser.ctg;
    let userid = JSON.stringify(loggedinUser._id);
    let userAllCtgs = getCategories(userCtgs);
    let allGamesCtgs = getCategories(allGames, true);
    let sameCtgsResponse = findCommonElements(userAllCtgs, allGamesCtgs);
    let sameCtgsArr = [];
    sameCtgsResponse.forEach((ctg) => {
      sameCtgsArr.push(ctg);
    });
    const userGames = await Games.find({
      categories: sameCtgsArr,
    });

    // console.log(userComments);
    // console.log("loggedinUser id:", userComments.text);
    // console.log("user ctgs: ", userAllCtgs);
    // console.log("all games ctgs: ", allGamesCtgs);
    // console.log("same categories:", sameCtgsArr);
    // console.log("fave games: ", userGames);
    // console.log("same ctg arr: ", sameCtgsArr);
    if (sameCtgsArr.length === 0) {
      console.log("same ctg arr===0: ", sameCtgsArr.length);
      return response.json({
        user: loggedinUser,
        games: allGames,
        newGames: newGames,
        comments: userComments,
      });
    } else if (sameCtgsArr.length !== 0) {
      console.log("same ctg arr!==0: ", sameCtgsArr.length);
      return response.json({
        user: loggedinUser,
        games: userGames,
        newGames: newGames,
        comments: userComments,
        // userComments: userComments,
      });
    }
  } else {
    return response.json({
      games: allGames,
      newGames: newGames,
      comments: userComments,
    });
  }
});

// homeRouter.get("/:email", async (request, response) => {
//   const { email } = request.params;
//   if (await User.findOne({ email })) {
//     return response.status(200).send({ userData: userInDb });
//   } else {
//     response.send(400);
//   }
// });
module.exports = homeRouter;
