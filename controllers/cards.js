const express = require('express')
const cardRouter = express.Router();
const Card = require('../models/card.js');


//INDEX ROUTE========================================
cardRouter.get('/', (req, res) => {
    Card.find({}, (error, cards) => {
        res.render('cards/index.ejs', {
            cards,
            currentUser: req.session.currentUser
        });
        console.log(cards);
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
    console.log(req.body);
    Card.create(req.body, (error, createdCard) => {
        res.redirect(`/cards`);
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