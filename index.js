const express = require("express");
const router = require("./controller/route");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("error", err);
  }
  console.log(`listening on port: ${PORT}`);
});

app.use(express.json());
app.use("/api/v1", router);
