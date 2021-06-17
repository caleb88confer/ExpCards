const express = require('express');
const deckRouter = express.Router();
const Deck = require('../models/deck.js');
const Card = require('../models/card.js');


// INDEX ROUTE=============================
deckRouter.get('/', (req, res) => {
    res.render('decks/index.ejs');
});

// NEW ROUTE================================
deckRouter.get('/new', (req, res) => {
    res.render('decks/new.ejs');
});

// DELETE ROUTE=============================

// UPDATE ROUTE=============================

// CREATE ROUTE=============================

// EDIT ROUTE===============================

// SHOW ROUTE===============================

module.exports = deckRouter;