import 'isomorphic-fetch';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import cookie from 'isomorphic-cookie';

import reducers from 'reducers';
import webRoutes from 'web/routes';
// import ApiClient from 'web/apiClient';
import { login } from 'actions/authActions';

// import ContextProvider from 'web/ContextProvider';
import Html from './Html';
import ErrorPage from './ErrorPage';

export default function (req, res) {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

  const store = createStore(
    combineReducers(reducers),
    compose(applyMiddleware(thunk)),
  );

  // TODO: update how this works, but for now it'll tell the store we're logged in
  const authToken = cookie.load('jwt', req);

  // since we need to create the store before we creat the auth client,
  // we'll dispatch a login here on start if they've got a jwt cookie
  if (authToken) {
    store.dispatch(login());
  }

  // TODO: WTF is this????
  const context = {};

  // The client-side App will instead use <BrowserRouter>
  const App = (
    <ApolloProvider client={apolloClient}>
      <Provider store={store} key="provider">
        <StaticRouter location={req.url} context={context}>
          {webRoutes}
        </StaticRouter>
      </Provider>
    </ApolloProvider>
  );

  getDataFromTree(App).then(() => {
    // We are ready to render for real
    const markup = ReactDOMServer.renderToString(App);
    const initialState = apolloClient.extract();

    const html = ReactDOMServer.renderToStaticMarkup(
      <Html {...{ markup, initialState }} />);

    res.status(200);
    res.send(`<!DOCTYPE html>${html}`);
    res.end();
  }).catch((err) => {
    console.error('*********** error getting data from tree');
    console.error(err);

    const html = ReactDOMServer.renderToStaticMarkup(<ErrorPage />);

    res.status(200);
    res.send(`<!DOCTYPE html>${html}`);
    res.end();
  });
}
