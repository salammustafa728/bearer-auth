'use strict';

const base64 = require('base-64');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const bcrypt = require("bcrypt");
const {userModel}=require('../models/index');

const basicAuth= async  (req,res,next) =>{
    if(req.headers['authorization']){
        let bsicHeaderParts = req.headers.authorization.split(' ');
        console.log('basicHeadersParts >>> ',bsicHeaderParts);
        let encodedData = bsicHeaderParts.pop();
        console.log('encodedPart ', encodedData);
        let decodedData = base64.decode(encodedData);
        console.log('decodeddata ', decodedData);
        let [username,password]=decodedData.split(':');
        console.log('username',username);

        try {
            const getUser = await userModel.findOne({where:{username:username}});
            console.log("username9999", getUser.password);
            const validUser = await bcrypt.compare(password, getUser.password);
            if (validUser) {
              let newToken = jwt.sign({ username: getUser.username }, SECRET);
              getUser.token = newToken;
              console.log("newTken", newToken);
            //   return getUser;
              res.status(200).json(getUser);
            } else {
            //   console.log("user is not valid");
            //   throw new Error("Invalid password");
              res.status(401).send('invalid user');
            }
          } catch (error) {
            res.status(401).send(error);
            // console.log("error", error);
          }
    }
    
}
module.exports = basicAuth;