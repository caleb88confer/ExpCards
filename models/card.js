//DEPENDANCIES=================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CARD SCHEMA===================================
const cardSchema = new Schema({
    title: String,
    coverPhoto: String,
    type: String,
    time: String,
    stats: { 
        adventure: Number,
        community: Number,
        challenge: Number,
    },
    flavorText: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },


}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;