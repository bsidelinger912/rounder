/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';

import reducers from 'reducers';
import routes from 'web/routes';
import ApiClient from 'web/apiClient';
import ContextProvider from 'web/ContextProvider';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const appolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

appolloClient.query({
  query: gql`
    {
      getUser(id: "5bdbe0e075d95e8db4a80bfb") {
        email
        id
      }
    }
  `,
})
.then(result => console.error(result));

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
        <Provider store={store} key="provider">
          <Router routes={routesFile} render={props => <ReduxAsyncConnect {...props} helpers={{ apiClient }} />} history={browserHistory} />
        </Provider>
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
