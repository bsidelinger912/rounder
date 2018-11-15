/* eslint-disable no-console, global-require, import/no-dynamic-require */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as graphlHTTP from 'express-graphql';

import schema from './app/schemas';
import configDb from './config/database';
import auth from './app/routes/auth';

export interface IGraphQlContext {
  req: express.Request;
  res: express.Response;
}

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

app.use('/graphql', graphlHTTP((req, res) => {
  const context: IGraphQlContext = { req, res };

  return{
    schema,
    context,
    graphiql: true,
  };
}));

// non-graphql routes
auth(app);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
