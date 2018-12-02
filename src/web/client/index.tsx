/* eslint-env browser */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
const cookie = require('isomorphic-cookie');

import reducers from 'src/reducers';
import webRoutes from 'src/web/routes';
import AuthClient from 'src/web/AuthClient';
import { Provider as ContextProvider } from 'src/web/Context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = cookie.load('jwt');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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
            <>
              <BrowserRouter>{routes}</BrowserRouter>
              <ToastContainer hideProgressBar={true} />
            </>
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
