const express = require('express')
const cardRouter = express.Router();
const User = require('../models/user.js');
const cardModule = require('../models/card.js');
const Card = cardModule.Card;


//INDEX ROUTE========================================
cardRouter.get('/', (req, res) => {
    res.render('cards/index.ejs', {
        currentUser: req.session.currentUser
    });
 
});
//NEW ROUTE============================================
cardRouter.get('/new', (req, res) => {
    res.render('cards/new', {
        currentUser: req.session.currentUser
    });
});

//CREATE ROUTE=========================================
cardRouter.post('/:id/new', (req, res) => {
    //find the parent document by id
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        //push req.body into corresponding array
        foundUser.cards.push(req.body);
        //save the parent document to commit changes to database
        foundUser.save(() => {
            // then res.redirect 
            res.redirect('/cards');
        });
    });
});

//SHOW ROUTE===========================================
cardRouter.get('/:cardId/show', (req, res) => {
    console.log(req.params.cardId);
    Card.findById(req.params.cardId, (error, foundCard) => {
        res.render('cards/show.ejs', {
            card: foundCard
        });
    });
});


module.exports = cardRouter;