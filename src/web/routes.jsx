import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'web/App';
import Home from 'web/pages/Home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
