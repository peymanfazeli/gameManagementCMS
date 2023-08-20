const { Router, response, request } = require("express");
const gameRoute = Router();

const Games = require("../DB/schemas/games");
const Comments = require("../DB/schemas/comments");
const User = require("../DB/schemas/user");

// const games = [
//   {
//     name: "call Of Duty",
//     comments: 15,
//     categories: [],
//     pic: "https://www.gamespot.com/a/uploads/square_small/1197/11970954/2309176-dishonored_box_art_bethesda.jpg",
//     rate: 10,
//   },
//   {
//     name: "The last of us",
//     comments: 20,
//     categories: [],
//     pic: "https://www.gamespot.com/a/uploads/square_small/1197/11970954/2309176-dishonored_box_art_bethesda.jpg",
//     rate: 5,
//   },
//   {
//     name: "Dishonored2",
//     comments: 5,
//     categories: [],
//     pic: "https://www.gamespot.com/a/uploads/square_small/1197/11970954/2309176-dishonored_box_art_bethesda.jpg",
//     rate: 3.8,
//   },
//   {
//     name: "The Last Guardian",
//     comments: 3,
//     categories: [],
//     pic: "https://www.gamespot.com/a/uploads/screen_petite/1197/11970954/2886484-tlg_e315_07.jpg",
//     rate: 2,
//   },
// ];
// if user is logged in show this route
// gameRoute.use((req, res, next) => {});
// Post newGames
gameRoute.get("/postgame", (request, response) => {
  response.send({ msg: "ok" });
});
gameRoute.post("/postgame", async (request, response) => {
  const { title, abstract, info, categories } = request.body;

  if (
    title.length !== 0 &&
    abstract.length !== 0 &&
    info.length !== 0 &&
    categories.length !== 0
  ) {
    let comments = "[]";
    await Games.create({
      title,
      abstract,
      info,
      categories,
      large_image: "C:/xampp/htdocs/IE-Express/Public/images/generalAvatar.png",
      small_image: "C:/xampp/htdocs/IE-Express/Public/images/generalAvatar.png",
      comments,
    });
    console.log("request body in /postGame: ", request.body);
    response.send({ games: Games });
  } else {
    response.sendStatus(404);
  }
});
// search games based on rate
// gameRoute.get("/", (req, res) => {
//   const { rate } = req.query;
//   const rateInt = parseInt(rate);
//   if (!isNaN(rateInt)) {
//     const filteredGames = games.filter((game) => game.rate <= rateInt);
//     res.send(filteredGames);
//   } else {
//     res.send(games);
//   }
// });
// gameRoute.get("/:gameName/:tab", (request, response) => {
//   console.log("game tab in server: ", request.params);
//   response.send(200);
// });

gameRoute.post("/updateGame", async (request, response) => {
  const { _id, title, abstract, info, categories } = request.body;
  let game = await Games.findOne({ _id: _id });
  if (_id) {
    await Games.updateMany(
      { _id: _id },
      {
        $set: {
          title: title,
          abstract: abstract,
          info: info,
          categories: categories,
        },
      }
    );
    response.json({ game: game });
  } else {
    response.sendStatus(400);
  }
});
gameRoute.post("/deleteGame", async (request, response) => {
  const { _id } = request.body;
  console.log("id to be deleted: ", _id);
  if (_id) {
    await Games.deleteMany({ _id: _id });
    let game = await Games.find();
    response.json({ game: game });
  } else {
    response.sendStatus(404);
  }
});
// gameRoute.get("/:gameName/header", (request, response) => {
//   response.send(200);
// });
gameRoute.get("/:gameName", async (request, response) => {
  const { gameName } = request.params;
  console.log("game name in server: ", request.params);
  let game = await Games.findOne({ title: gameName });
  // let game = await Games.find({ title: gameName });
  if (!request.params) {
    response.sendStatus(404);
  } else if (game) {
    response.json({ game: game });
  } else {
    response.sendStatus(400);
  }
});
gameRoute.get("/:gameName/:tab", async (request, response) => {
  const { gameName, tab } = request.params;
  let game = await Games.findOne({ title: gameName });
  let commentsInGameDoc = game.comments;
  let users = commentsInGameDoc.map((comment) => comment.userId);
  let uniqueUsers = [...new Set(users)];
  console.log(uniqueUsers);
  // console.log("gameName/comments: ", game.comments)
  // console.log("userId: ", request.user._id);
  // let gameCmsInCommentDoc = await Comments.find({ gameId: game._id });
  // let gameCmsInCommentDoc
  // console.log("comments in comments doc: ", gameCmsInCommentDoc.length);
  // console.log("comments in game doc:", commentsInGameDoc.length);

  // if (commentsInGameDoc.length !== gameCmsInCommentDoc.length) {
  //   await Games.updateMany(
  //     { _id: game._id },
  //     { comments: gameCmsInCommentDoc }
  //   );
  // }
  if (!request.params) {
    response.sendStatus(404);
  } else if (tab) {
    return response.json({ game: game, tab: tab, playersId: uniqueUsers });
  }
  response.send(200);
});

gameRoute.post("/sendComment", async (request, response) => {
  const { gameTitle, userCm } = request.body;
  console.log("gameTitle is: ", gameTitle, "cm is: ", userCm);
  const user = request.user;
  const gameId = await Games.findOne({ title: gameTitle });
  let updateGameCm = await Games.updateOne(
    { title: gameTitle },
    {
      $push: {
        comments: { userId: user._id, text: userCm, gameId: gameId._id },
      },
    }
  );
  response.json({ game: updateGameCm });
});
// function searchName(name) {
//   return games.find((game) => game.name === name);
// }
module.exports = gameRoute;
