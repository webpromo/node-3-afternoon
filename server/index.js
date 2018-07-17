
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const checkForSession = require('./middlewares/checkForSession'); 
const auth_controller = require('./controllers/auth_controller');

const app=express();

app.use(bodyParser.json());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);

// endpoints
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

// controllers
const swag_controller = require('./controllers/swag_controller');
app.get('/api/swag', swag_controller.read);

// cart
const cart_controller = require('./controllers/cart_controller');
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

// search
const search_controller = require('./controllers/search_controller');
app.get('./api/search', search_controller.search);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {console.log("Server listening intently on port"+port)});