/* eslint-disable no-console, global-require, import/no-dynamic-require */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const graphlHTTP = require('express-graphql');

const configDB = require('./config/database');
const schema = require('./app/schemas');

const port = 4000;
const app = express();

// to make mongoose's id work with graphql
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function valueOf() {
  return this.toString();
};

// db connection
mongoose.connect(configDB.url, {
  useMongoClient: true,
});

app.use(cors());
app.use(morgan('dev')); // log every request to the console

// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());

// allows us to serve cross domain, redundant with cors package???????
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  next();
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/graphql', graphlHTTP((req, res) => ({
  schema,
  graphiql: true,
  context: { req, res, foo: 'bar' },
})));

// main routes
require('./app/routes/auth.js')(app);
require('./app/routes/user.js')(app);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
