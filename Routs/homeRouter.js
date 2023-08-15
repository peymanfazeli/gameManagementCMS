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
  if (request.user) {
    let loggedinUser = request.user;
    let userCtgs = loggedinUser.ctg;
    let userAllCtgs = getCategories(userCtgs);
    let allGames = await Games.find();
    let allGamesCtgs = getCategories(allGames, true);
    let sameCtgsResponse = findCommonElements(userAllCtgs, allGamesCtgs);
    let sameCtgsArr = [];
    sameCtgsResponse.forEach((ctg) => {
      sameCtgsArr.push(ctg);
    });
    const userGames = await Games.find({
      categories: sameCtgsArr,
    });
    // console.log("user ctgs: ", userAllCtgs);
    // console.log("all games ctgs: ", allGamesCtgs);
    // console.log("same categories:", sameCtgsArr);
    // console.log("fave games: ", userGames);
    return response.json({ user: loggedinUser, games: userGames });
  } else {
    const allGames = await Games.find();
    return response.json({ games: allGames });
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
