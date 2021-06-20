require('dotenv').config();
//DEPENDENCIES=========================================
const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const Card = require('./models/card.js');
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
//CONFIGURE MONGOOSE===================================
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
// -   -   -   -   -   -   -   -   -   -   -   -   -   -
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
//set the default view engine =========================
app.set('view engine', 'ejs');
//HOME ROUTE ==========================================
//MOUNTING MIDDLEWARE =================================
//middleware for css
app.use(fileUpload({ createParentPath: true}));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false}));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
app.use(methodOverride('_method'));

// link to controllers -    -   -   -   -   -   -   -   
const userController = require('./controllers/users');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

const cardControlller = require('./controllers/cards');
app.use('/cards', cardControlller);

const deckController = require('./controllers/decks');
app.use('/decks', deckController);

//HOME ROUTE/DASHBOARD=====================
app.get('/', (req, res) => {
    if(req.session.currentUser) {
        Card.find({ createdBy: req.session.currentUser._id }, (error, cards) => {
            res.render('dashboard.ejs', {
                currentUser: req.session.currentUser,
                cards
            });
        });
    } else {
        res.render('index.ejs');
    }
});
//LISTENER============================================
app.listen(port, () => {
    console.log('Express is listening on port:', port);
});
