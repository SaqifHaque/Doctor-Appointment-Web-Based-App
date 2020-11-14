//declaration
const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const registration = require('./controller/registration');
const login = require('./controller/login');
const app = express();

//config
app.set('view engine', 'ejs');

//middleware
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(exSession({ secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());


app.use('/registration', registration);
app.use('/login', login);

// app.use('/login', login);
// app.use('/home', home);
// app.use('/logout', logout);
// app.use('/user', user);

//route
app.get('/', (req, res) => {
    res.send('Hello from express server');
});

//server startup
app.listen(2020, (error) => {
    console.log('express server started at 2020...');
});