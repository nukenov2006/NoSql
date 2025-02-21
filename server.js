const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Successfully connected to MongoDB!"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 60000 }
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/catalog', require('./routes/catalog'));
app.use('/contact', require('./routes/contact'));
app.use('/gallery', require('./routes/gallery'));

const Product = require('./models/Product');


app.get('/catalog/search', async (req, res) => {
    try {
        const { id, sort } = req.query;
        let query = {};

        if (id) {
            query._id = id;
        }

        let products = await Product.find(query);
        
        if (sort === 'price_asc') {
            products = products.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_desc') {
            products = products.sort((a, b) => b.price - a.price);
        }

        res.render('catalog', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname)); 
app.listen(PORT, () => {
    console.log(${PORT});
});
