/* eslint-disable no-console, global-require, import/no-dynamic-require */
const express = require('express');
const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database.js');

/*
const uploadImage = require('./uploadImage');

const upload = multer({ dest: 'uploads/' });*/

const port = 4000;
const app = express();

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(cors());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// allows us to server icomoon cross domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  next();
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// app.post('/image-upload', upload.array('photos', 12), uploadImage);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
