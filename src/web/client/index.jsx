/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// TODO: use browser router????
import { BrowserRouter } from 'react-router-dom';

import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import reducers from 'reducers';
import webRoutes from 'web/routes';
import AuthClient from 'web/authClient';
import ContextProvider from 'web/ContextProvider';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__), // eslint-disable-line no-underscore-dangle
});

const store = createStore(
  combineReducers(reducers),
  window.__data, // eslint-disable-line no-underscore-dangle
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

const authClient = new AuthClient(store);

const render = (routes) => {
  ReactDOM.render(
    <AppContainer>
      <ContextProvider authClient={authClient}>
        <ApolloProvider client={apolloClient}>
          <Provider store={store} key="provider">
            <BrowserRouter>{routes}</BrowserRouter>
          </Provider>
        </ApolloProvider>
      </ContextProvider>
    </AppContainer>,
    document.getElementById('react-root'),
  );
};

render(webRoutes);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('web/routes.jsx', () => {
    const nextRoutes = require('web/routes').default; // eslint-disable-line global-require
    render(nextRoutes);
  });
}
