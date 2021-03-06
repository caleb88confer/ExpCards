//DEPENDANCIES=================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//USER SCHEMA====================================
const userSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true },

});

//USER MODEL======================================
const User = mongoose.model('User', userSchema);

//EXPORTS USER MODEL==============================
module.exports = User;