import React from 'react';
import { Route } from 'react-router-dom';

import App from 'web/App';
import Home from 'web/pages/Home';
import NewProfile from 'web/pages/NewProfile';

export default (
  <App>
    <Route path="/" exact component={Home} />
    <Route path="/new-profile" component={NewProfile} />
  </App>
);
