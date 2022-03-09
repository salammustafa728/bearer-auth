"use strict";
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const { userModel } = require("../models/index");

const bearerAuth = async (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let bearerHederPart = req.headers.authorization.split(" ");
      console.log("bearerHederPart >>> ", bearerHederPart);
      let token = bearerHederPart.pop();
      console.log("Token >>> ", token);
      if (token) {
        const parsedToken = jwt.verify(token, SECRET);
        console.log("lllllll", parsedToken);
        const Users = await userModel.findOne({
          where: { username: parsedToken.username },
        });
        console.log(Users);
        if (Users) {
          req.token = parsedToken;
          req.Users = Users;
          next();
        } else {
          res.status(401).send("invalid user");
        }
      }
     
    } catch (error) {
      res.status(401).send(error);
    }
  } else {
    res.status(401).send("Empty");
  }
};

module.exports = bearerAuth;
