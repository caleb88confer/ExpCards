const express = require('express')
const cardRouter = express.Router();
const User = require('../models/user.js');
const Card = require('../models/card.js');
const cloudinary = require('cloudinary').v2;

//cloudinary config=======================
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


//INDEX ROUTE========================================
cardRouter.get('/', (req, res) => {
    Card.find({
        createdBy: req.session.currentUser._id
    }, (error, cards) => {
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

// DELETE ROUTE=============================
cardRouter.delete('/:id', (req, res) => {
    Card.findByIdAndRemove(req.params.id, () => {
        res.redirect('/cards');
    });
});

// UPDATE ROUTE=============================
cardRouter.put('/:id', (req, res) => {
    Card.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect(`/cards/${req.params.id}`);
    });
});

//CREATE ROUTE=========================================
cardRouter.post('/', (req, res) => {
    const photo = req.files.coverPhoto;
    photo.mv(`./uploads/${photo.name}`);
    cloudinary.uploader.upload(`./uploads/${photo.name}`, function (error, result) {
        req.body.coverPhoto = result.secure_url;
        Card.create(req.body, (error, createdCard) => {
            res.redirect('/cards');
        });


    });
});

// EDIT ROUTE==============================
cardRouter.get('/:id/edit', (req, res) => {
    Card.findById(req.params.id, (error, card) => {
        res.render('cards/edit.ejs', {
            card,
            currentUser: req.session.currentUser
        });
    });
});

//SHOW ROUTE===========================================
cardRouter.get('/:cardId', (req, res) => {
    Card.findById(req.params.cardId, (error, card) => {
        res.render('cards/show.ejs', {
            card
        });
    });

});


module.exports = cardRouter;