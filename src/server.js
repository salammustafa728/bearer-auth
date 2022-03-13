'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./handler/500');
const notfound = require('./handler/404');
//Routes data
const signupRoutes = require('./routes/auth/signup');
const basicAuthMiddleware = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const { User } = require('./models/index');

app.use(express.json());
app.use(cors());

//rotes

app.use(signupRoutes);
app.post('/signin',basicAuthMiddleware(User),signinHandlerFunc);
app.get('/secretstafff', bearerAuth(User), userHandler)

// app.use(secretStaffRoute);

function signinHandlerFunc(req,res){
    res.status(200).json(req.user);
}


function userHandler(req,res){
  res.status(200).json(req.user);
}


function start(port) {
    app.listen(port, () => {
      console.log(`Running on ${port}`);
    });
  }
  
app.get('/', (req, res) => {
  res.send('Home');
});

app.use(errorHandler);
app.use('*',notfound);

module.exports = {
    app: app,
    start: start,
  };