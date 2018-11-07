"use strict";
/* eslint-env browser */
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
// TODO: use browser router????
var react_router_dom_1 = require("react-router-dom");
var redux_thunk_1 = require("redux-thunk");
var react_hot_loader_1 = require("react-hot-loader");
var apollo_boost_1 = require("apollo-boost");
var react_apollo_1 = require("react-apollo");
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var reducers_1 = require("reducers");
var routes_1 = require("web/routes");
var authClient_1 = require("web/authClient");
var ContextProvider_1 = require("web/ContextProvider");
var apolloClient = new apollo_boost_1["default"]({
    uri: 'http://localhost:4000/graphql',
    cache: new apollo_cache_inmemory_1.InMemoryCache().restore(window.__APOLLO_STATE__)
});
var store = redux_1.createStore(redux_1.combineReducers(reducers_1["default"]), window.__data, // eslint-disable-line no-underscore-dangle
redux_1.compose(redux_1.applyMiddleware(redux_thunk_1["default"]), window.devToolsExtension ? window.devToolsExtension() : function (f) { return f; }));
var authClient = new authClient_1["default"](store);
var render = function (routes) {
    react_dom_1["default"].render(<react_hot_loader_1.AppContainer>
      <ContextProvider_1["default"] authClient={authClient}>
        <react_apollo_1.ApolloProvider client={apolloClient}>
          <react_redux_1.Provider store={store} key="provider">
            <react_router_dom_1.BrowserRouter>{routes}</react_router_dom_1.BrowserRouter>
          </react_redux_1.Provider>
        </react_apollo_1.ApolloProvider>
      </ContextProvider_1["default"]>
    </react_hot_loader_1.AppContainer>, document.getElementById('react-root'));
};
render(routes_1["default"]);
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('src/web/routes.jsx', function () {
        var nextRoutes = require('src/web/routes')["default"]; // eslint-disable-line global-require
        render(nextRoutes);
    });
}
