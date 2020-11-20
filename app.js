//declaration
const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const registration = require('./controller/registration');
const login = require('./controller/login');
const pincode = require('./controller/pincode');
const userdash = require('./controller/userdash');
const app = express();
const toastr = require('express-toastr');
require('dotenv').config();

//config
app.set('view engine', 'ejs');

//middleware
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exSession({ secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());
app.use(toastr());

app.use('/registration', registration);
app.use('/login', login);
app.use('/pincode', pincode);
app.use('/userdash', userdash);

//route
app.get('/', (req, res) => {
    res.send('Hello from express server');
});

//server startup
app.listen(2020, (error) => {
    console.log('express server started at 2020...');
});