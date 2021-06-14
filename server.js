require('dotenv').config();
//DEPENDENCIES=========================================
const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;
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
app.use(methodOverride('_method'));

// link to controllers -    -   -   -   -   -   -   -   


//HOME ROUTE=====================
app.get('/', (req, res) => {
    res.render('index.ejs');
})
//LISTENER============================================
app.listen(port, () => {
    console.log('Express is listening on port:', port);
});
