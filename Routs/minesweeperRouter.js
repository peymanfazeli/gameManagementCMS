const { Router, request } = require("express");

const minesweeperRouter = Router();
minesweeperRouter.get("/", (request, resposnse) => {
  resposnse.send({ min: "ok" });
});

module.exports = minesweeperRouter;
