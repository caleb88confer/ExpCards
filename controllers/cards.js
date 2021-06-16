const express = require('express')
const cardRouter = express.Router();
const User = require('../models/user.js');
const Card = require('../models/card.js');


//INDEX ROUTE========================================
cardRouter.get('/', (req, res) => {
    Card.find({ createdBy: req.session.currentUser._id }, (error, cards) => {
        res.render('cards/index.ejs', {
            currentUser: req.session.currentUser,
            cards

        });
    });
 
});
//NEW ROUTE============================================
cardRouter.get('/new', (req, res) => {
    res.render('cards/new', {
        currentUser: req.session.currentUser
    });
});

//CREATE ROUTE=========================================
cardRouter.post('/', (req, res) => {
    Card.create(req.body, (error, createdCard) => {
        res.redirect('/cards');
    });
});

//SHOW ROUTE===========================================
cardRouter.get('/:cardId/show', (req, res) => {
    res.render('cards/show.ejs');

});


module.exports = cardRouter;