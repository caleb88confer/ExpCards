//DEPENDENCIES========================================
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const userRouter = express.Router();
const User = require('../models/user.js');

//NEW USER ROUTE (REGISTRAION PAGE)====================
userRouter.get('/new', (req, res) => {
    res.send('hello world');
});

//CREATE ROUTE (REGISTRATION)==========================



//EXPORT USER ROUTE==================================
module.exports = userRouter;

