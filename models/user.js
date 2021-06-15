//DEPENDANCIES=================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cardModule = require('./card.js');
const cardSchema = cardModule.cardSchema;

//USER SCHEMA====================================
const userSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    cards: [cardSchema],
    decks: [],

});

//USER MODEL======================================
const User = mongoose.model('User', userSchema);

//EXPORTS USER MODEL==============================
module.exports = User;