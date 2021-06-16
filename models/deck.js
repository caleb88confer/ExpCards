const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    title: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cardsContained: [ 
        {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }
    ]

}, { timestamps: true });

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;