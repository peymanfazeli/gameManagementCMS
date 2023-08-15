console.log("==== TEST API ====");
import express from "express";

const app = express();
const PORT = 3000;
// app.get("/", (req, res) => {
//   res.send(200);
// });
// app.listen(PORT, () => {
//   console.log(`**** Connected to Server on port: ${PORT} ****`);
// });
app.use(express.static("../Public"));
app.use((req, res) => {
  console.log(`${req.method}: ${req.url}`);
});
app.use(express.json({ extended: true, limit: "2mb" }));
app.post("/", (req, res) => {
  const { answer } = req.body;
  console.log(req.body);

  res.status(200).json({ answer });
});
app.get("/registration", (req, res) => {
  res.send(200);
  console.log(`${req.method}: ${req.url}`);
});
app.post("/registration", (req, res) => {
  const { userName, email, password } = req.body;

  console.log(req.body);
  res.status(200).json({ userName, password, email });
});
app.listen(PORT);
