const express = require('express')
const cardRouter = express.Router();
const Card = require('../models/card.js');


//INDEX ROUTE========================================
cardRouter.get('/:id', (req, res) => {
    Card.find({}, (error, cards) => {
        res.render('cards/index.ejs', {
            cards,
            currentUser: req.session.currentUser
        });
        console.log(cards);
    });
});
//NEW ROUTE============================================
cardRouter.get('/:id/new', (req, res) => {
    res.render('cards/new', {
        currentUser: req.session.currentUser
    });
});

//CREATE ROUTE=========================================
cardRouter.post('/:id', (req, res) => {
    console.log(req.body);
    Card.create(req.body, (error, createdCard) => {
        res.redirect(`/cards/${req.session.currentUser._id}`);
    });
});

//SHOW ROUTE===========================================
cardRouter.get('/:cardId/show', (req, res) => {
    Card.findById(req.params.cardId, (error, foundCard) => {
        res.render('cards/new.ejs', {
            card: foundCard
        });
    });
});


module.exports = cardRouter;