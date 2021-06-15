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
    });
});
//NEW ROUTE============================================
cardRouter.get('/:id/new', (req, res) => {
    res.render('cards/new', {
        currentUser: req.session.currentUser
    });
});


module.exports = cardRouter;