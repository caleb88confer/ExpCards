require('dotenv').config();
//DEPENDENCIES=========================================
const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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

//HOME ROUTE/DASHBOARD=====================
app.get('/', (req, res) => {
    console.log(req.session.currentUser);
    if(req.session.currentUser) {
        res.render('dashboard.ejs', {
            currentUser: req.session.currentUser
        });
        //change res.rend back to index.ejs after changes are made.
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
        });

    }
})
// 60c7c50b8206137581d6c9c1
//LISTENER============================================
app.listen(port, () => {
    console.log('Express is listening on port:', port);
});
