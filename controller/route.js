const express = require("express");
const router = express.Router();
const { randomUUID } = require("crypto");
const LocalStorage = require("node-localstorage").LocalStorage;
const jsonwebtoken = require("jsonwebtoken");
const verify = require("./middleware");

let localStorage = new LocalStorage("./store");

//login using default admin user pass
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    return res.json({
      token: jsonwebtoken.sign({ user: "admin" }, process.env.JWT_SECRET),
    });
  }

  return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
});

//add data we can add any data there's no check
router.post("/add", verify, (req, res) => {
  try {
    let data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
      res.status(422).json({ message: "please provide any darta" });
    }
    let uuid = randomUUID();
    localStorage.setItem(uuid, JSON.stringify(data));
    res.status(201).json({ message: "data created", uuid });
  } catch (error) {
    res.status(200).json({ message: `something went wrong error: ${error}` });
  }
});

//get price based on query
router.get("/price", verify, (req, res) => {
  let price_cal = req.query.price_calculation;
  let storage_length = localStorage.length;

  res.json({
    message: "price calculation based on query params",
    price: price_cal * storage_length,
  });
});

module.exports = router;
