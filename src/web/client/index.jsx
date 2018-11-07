/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import reducers from 'reducers';
import routes from 'web/routes';
import ApiClient from 'web/apiClient';
import ContextProvider from 'web/ContextProvider';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const store = createStore(
  combineReducers(reducers),
  window.__data, // eslint-disable-line no-underscore-dangle
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

const apiClient = new ApiClient(store);

const render = (routesFile) => {
  ReactDOM.render(
    <AppContainer>
      <ContextProvider apiClient={apiClient}>
        <ApolloProvider client={apolloClient}>
          <Provider store={store} key="provider">
            <Router routes={routesFile} render={props => <ReduxAsyncConnect {...props} helpers={{ apiClient }} />} history={browserHistory} />
          </Provider>
        </ApolloProvider>
      </ContextProvider>
    </AppContainer>,
    document.getElementById('react-root'),
  );
};

render(routes);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('web/routes.jsx', () => {
    const nextRoutes = require('web/routes').default; // eslint-disable-line global-require
    render(nextRoutes);
  });
}
