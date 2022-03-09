
const express = require('express');

const basicAuthMiddleware = require('../../middleware/basic');



const userModel = require('../../models/user.model')

const routerSignin = express.Router();

routerSignin.post('/signin',basicAuthMiddleware,signinHandlerFunc);


function signinHandlerFunc(req,res){
    res.status(200).json(req.user);
}


module.exports = routerSignin;