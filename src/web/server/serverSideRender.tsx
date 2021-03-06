import 'isomorphic-fetch';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { Request, Response } from 'express';
// TODO: make typings for isomorphic-cookie
const cookie = require('isomorphic-cookie');

import reducers from 'src/reducers';
import webRoutes from 'src/web/routes';
import AuthClient from 'src/web/AuthClient';
import { Provider as ContextProvider } from 'src/web/Context';
import Html from 'src/web/server/Html';
import ErrorPage from 'src/web/server/ErrorPage';

export default function (req: Request, res: Response) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = cookie.load('jwt', req);
  
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      }
    }
  });

  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const store = createStore(
    combineReducers(reducers),
    compose(applyMiddleware(thunk)),
  );

  const authClient = new AuthClient(store, req);
  const context = {};

  const App = (
    <ApolloProvider client={apolloClient}>
      <ContextProvider value={{ authClient }}>
        <Provider store={store} key="provider">
          <StaticRouter location={req.url} context={context}>
            {webRoutes}
          </StaticRouter>
        </Provider>
      </ContextProvider>
    </ApolloProvider>
  );

  getDataFromTree(App).then(() => {
    const markup = ReactDOMServer.renderToString(App);
    const initialState = apolloClient.extract();

    const html = ReactDOMServer.renderToStaticMarkup(
      <Html {...{ markup, initialState }} />);

    res.status(200);
    res.send(`<!DOCTYPE html>${html}`);
    res.end();
  }).catch((err) => {
    console.error('*********** error getting data from tree'); // eslint-disable-line
    console.error(err); // eslint-disable-line

    const html = ReactDOMServer.renderToStaticMarkup(<ErrorPage />);

    res.status(200);
    res.send(`<!DOCTYPE html>${html}`);
    res.end();
  });
}
