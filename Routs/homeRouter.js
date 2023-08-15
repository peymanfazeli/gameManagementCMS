const { Router } = require("express");
const homeRouter = Router();

const Games = require("../DB/schemas/games");
const comments = require("../DB/schemas/comments");

const homeResposne = {
  ok: true,
  result: {
    homepage: { comments: [], new_games: [], slider: [], tutorials: [] },
  },
};

homeRouter.get("/", (request, response) => {
  if (request.user) {
    // let userId = request.user._id;
    // console.log("request User in homerouter userOk:", userId.toString());
    return response.json({ user: request.user });
  } else {
    return response.json({ response: homeResposne });
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
