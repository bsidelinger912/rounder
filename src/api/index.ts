/* eslint-disable no-console, global-require, import/no-dynamic-require */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
/* const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const graphlHTTP = require('express-graphql');

const configDB = require('./config/database');
const schema = require('./app/schemas');
*/

import configDb from './config/database';

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function valueOf() {
  return this.toString();
};

// db connection
mongoose.connect(configDb.url, {
  useMongoClient: true,
});

const port = 4000;
const app = express();

app.use(cors());

// allows us to serve cross domain, redundant with cors package???????
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  next();
});

app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/ping', (_, res) => {
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
