const express = require('express')
const cardRouter = express.Router();
const Card = require('../models/card.js');


//INDEX ROUTE========================================
cardRouter.get('/:id', (req, res) => {
    Card.find({}, (error, cards) => {
        res.render('cards/index.ejs', {
            cards
        });
    });
});


module.exports = cardRouter;