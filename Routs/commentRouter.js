const { Router, response } = require("express");
const commentRoute = Router();

const Games = require("../DB/schemas/games");
const Comments = require("../DB/schemas/comments");
const User = require("../DB/schemas/user");

commentRoute.get("/", async (request, response) => {
  if (request.user) {
    let user = request.user;
    return response.json({ user: user });
  } else {
    return response.sendStatus(404);
  }
});

commentRoute.get("/:id", async (request, response) => {
  const { userId } = request.params;
  console.log(request.body);
  if (userId) {
    let foundPlayer = await User.findOne({ _id: userId });
    response.json({ user: foundPlayer.userName });
  } else {
    // response.sendStatus(404);
    return;
  }
});
commentRoute.post("/sendComment", async (request, response) => {
  if (request.user) {
    const { userCm, gameTitle } = request.body;
    const user = request.user;
    const game = await Games.findOne({ title: gameTitle });
    console.log(
      `userId is: ${user._id}. userCm is: ${userCm}. gameTitle is: ${gameTitle}. userAvatar is: ${user.avatar}. gameName is:${game.title}`
    );
    if (game.comments[0] === "[]") {
      await Games.updateMany(
        { _id: game._id },
        {
          $set: {
            comments: {
              userId: user._id,
              userName: user.userName,
              text: userCm,
              userAvatar: user.avatar,
              gameId: game._id,
              gameName: game.title,
              date: new Date(),
            },
          },
        }
      );
    } else {
      await Games.updateMany(
        { _id: game._id },
        {
          $push: {
            comments: {
              userId: user._id,
              userName: user.userName,
              text: userCm,
              userAvatar: user.avatar,
              gameId: game._id,
              gameName: game.title,
              date: new Date(),
            },
          },
        }
      );
    }
    if ((user.comments[0] = "")) {
      await User.updateMany(
        { _id: user._id },
        {
          $set: {
            comments: {
              userId: user._id,
              userName: user.userName,
              text: userCm,
              userAvatar: user.avatar,
              gameId: game._id,
              gameName: game.title,
              date: new Date(),
            },
          },
        }
      );
    } else {
      await User.updateMany(
        { _id: user._id },
        {
          $push: {
            comments: {
              userId: user._id,
              userName: user.userName,
              text: userCm,
              userAvatar: user.avatar,
              gameId: game._id,
              gameName: game.title,
              date: new Date(),
            },
          },
        }
      );
    }
    Comments.create({
      userId: user._id,
      userName: user.userName,
      text: userCm,
      userAvatar: user.avatar,
      gameId: game._id,
      gameName: game.title,
      date: new Date(),
      rate: "0",
    });
    //   console.log("User after sending cm:", userInDb);
    response.json({ user: user.avatar });
  } else {
    response.json({ unAuthCode: 1404 });
  }
});
// commentRoute.get('/comments',async(request,response)=>{
//     const{userId}=request.params;
//     if(userId){
//         let user=await User
//         return response.json({user:user})
//     }
// });

module.exports = commentRoute;
