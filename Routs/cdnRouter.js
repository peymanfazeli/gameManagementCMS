const { Router } = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const User = require("../DB/schemas/user");
const Game = require("../DB/schemas/games");

const cdnRouter = Router();

cdnRouter.use(fileUpload());

cdnRouter.post("/", async (request, response) => {
  const user = request.user;
  // console.log("user: ", user);
  const cdnPath = "C:/xampp/htdocs/IE-Express/Public/images";
  const userAvatarPhoto = cdnPath + "/profilePhoto/";
  const userAvatarSrc = path.resolve(userAvatarPhoto);
  // console.log("cdn path: ", path.resolve(userAvatarSrc));
  if (!request.files) {
    response.send({ status: false, message: "No file uploaded" });
  } else {
    let avatar = request.files.image;
    if (avatar.mimetype !== "image/jpeg") {
      response.send({ status: false, message: "incorrect file type" });
    } else {
      avatar.name = user.userName + ".jpg";
      const avatarSrcInDb = cdnPath + "/profilePhoto/" + user.userName + ".jpg";
      console.log("avatarSrcInDb: ", avatarSrcInDb);
      await User.updateMany(
        { _id: user._id },
        { $set: { avatar: avatarSrcInDb } }
      );
      avatar.mv(cdnPath + "/profilePhoto/" + avatar.name);
      // response.send({ user: user });
    }
  }
});
cdnRouter.post("/games/:gameId", async (request, response) => {
  const { gameId } = request.params;
  const cdnPath = "C:/xampp/htdocs/IE-Express/Public/images";
  const gameImage = cdnPath + "/gameImages/";
  const gameImageSrc = path.resolve(gameImage);

  if (!request.files) {
    response.send({ status: false, message: "No file uploaded" });
  } else {
    let avatar = request.files.image;
    if (avatar.mimetype !== "image/jpeg") {
      response.send({ status: false, message: "incorrect file type" });
    } else {
      avatar.name = "game" + gameId + ".jpg";
      const avatarSrcInDb = cdnPath + "/gameImages/" + avatar.name;
      console.log("avatarSrcInDb: ", avatarSrcInDb);
      await Game.updateMany(
        { _id: gameId },
        { $set: { large_image: avatarSrcInDb } }
      );
      avatar.mv(cdnPath + "/gameImages/" + avatar.name);
      // response.send({ user: user });
    }
  }
});

module.exports = cdnRouter;
