import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'web/App';
import Home from 'web/pages/Home';
import NewArtist from 'web/pages/NewArtist';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/new-artist" component={NewArtist} />
  </Route>
);
