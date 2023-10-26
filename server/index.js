const express = require("express");
const cors = require("cors");

const port = 5000;
const DBconnect = require("./config/database");

require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL ?? "http://localhost:3000",
  })
);

DBconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

const quizRoute = require("./routes/quizRoute");
app.use("/api", quizRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
