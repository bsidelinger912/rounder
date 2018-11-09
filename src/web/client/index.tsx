/* eslint-env browser */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import reducers from 'src/reducers';
import webRoutes from 'src/web/routes';
import AuthClient from 'src/web/AuthClient';
import { Provider as ContextProvider } from 'src/web/Context';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__), // eslint-disable-line no-underscore-dangle
});

const store = createStore(
  combineReducers(reducers),
  (window as any).__data, // eslint-disable-line no-underscore-dangle
  compose(
    applyMiddleware(thunk),
    (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f,
  ),
);

const authClient = new AuthClient(store);

const render = (routes: JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <ContextProvider value={{ authClient }}>
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
if ((module as any).hot) {
  (module as any).hot.accept('src/web/routes', () => {
    const nextRoutes = require('src/web/routes').default; // eslint-disable-line global-require
    render(nextRoutes);
  });
}
