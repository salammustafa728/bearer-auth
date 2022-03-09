'use strict';

const express = require('express');
const secretStaffRoute = express.Router();
const bearerAuth = require('../../middleware/bearer');


secretStaffRoute.get('./secretstuff',bearerAuth,userHandler);

function userHandler(req,res){
    res.status(200).json(req.Users);
}


module.exports = secretStaffRoute;
