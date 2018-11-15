import * as React from 'react';
import { Route } from 'react-router-dom';

import App from 'src/web/App';
import Home from 'src/web/pages/Home';
import NewProfile from 'src/web/pages/NewProfile';
import Profile from 'src/web/pages/Profile';

export default (
  <App>
    <Route path="/" exact component={Home} />
    <Route path="/new-profile" component={NewProfile} />
    <Route path="/profiles/:profileId" component={Profile} />
  </App>
);
