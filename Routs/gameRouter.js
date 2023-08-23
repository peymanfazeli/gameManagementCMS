const { Router, response, request } = require("express");
const gameRoute = Router();

const Games = require("../DB/schemas/games");
const Comments = require("../DB/schemas/comments");
const User = require("../DB/schemas/user");
const { get } = require("mongoose");
const { stringify } = require("qs");

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
  // console.log("game name in server: ", request.params);
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
  let user = request.user;
  // let commentsInGameDoc = game.comments;
  console.log("tab is:", tab);
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
  } else {
    if (tab) {
      if (tab === "comments") {
        const comments = await Comments.findOne({ gameName: gameName });
        // console.log("comments for: " + gameName + " : " + comments);
        return response.json({
          game: game,
          tab: tab,
          comments: comments,
          user: user,
        });
      } else if (tab === "related_games") {
        const relatedGames = await Games.find({ categories: game.categories });
        return response.json({
          game: game,
          tab: tab,
          related_Games: relatedGames,
          user: user,
        });
      } else {
        return response.json({ game: game, tab: tab, user: user });
      }
    } else {
      return response.json({ game: game, user: user });
    }
  }
  response.send(200);
});
// comment section
gameRoute.post("/sendComment", async (request, response) => {
  const { gameTitle, userCm } = request.body;
  // console.log("gameTitle is: ", gameTitle, "cm is: ", userCm);
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
// Search
gameRoute.post("/searchGame", async (request, response) => {
  let allGames = await Games.find();
  let searchRes = [];
  if (request.body) {
    searchRes = [];
    const { searchItem } = request.body;
    let validateGameName;
    if (searchItem.length > 1) {
      validateGameName = searchItem.split(" ").join("").trim();
    } else {
      validateGameName = searchItem;
    }
    //   const validateGameName = searchItem.split(" ").join("").trim();
    allGames.forEach((game) => {
      let targetGame = game.title.includes(validateGameName);
      if (targetGame) {
        searchRes.push(game);
      }
    });
    if (searchRes.length < 1) {
      return response.sendStatus(400);
    }
    return response.json({ games: searchRes, searchKey: searchItem });
  } else {
    return response.send({ games: "" });
  }
});
// gameRoute.get("/searchGame/:searchItem", async (request, response) => {
//   console.log(request.params);
//   response.json({ game: "search items is worling" });
// });

gameRoute.get("/", async (request, respsonse) => {
  let allGames = await Games.find();
  let gameTitles = [];
  allGames.forEach((game) => {
    return gameTitles.push(game.title);
  });
  console.log("game titles:", gameTitles);

  let letters = request.query;
  let gameLetters = stringify(letters).split(" ").join("").trim().split("=")[1];
  console.log("game letters in gameRouter: ", gameLetters);
  let targetGame = gameTitles.filter((game) => game === gameLetters);
  if (targetGame.length > 0) {
    const endGame = await Games.findOne({ title: targetGame[0] });
    console.log("endGame is: ", endGame.title);
    respsonse.send({ game: endGame });
  }

  // console.log(gameTitles.indexOf(gameLetters));

  // Object.keys(allGames).forEach((keys) => {
  //   console.log("keys", allGames[keys]);
  // });
});
// function searchName(name) {
//   return games.find((game) => game.name === name);
// }
module.exports = gameRoute;
