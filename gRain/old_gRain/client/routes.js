import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import App from '../imports/ui/App.js';

import Admin from '../imports/ui/Layouts/Admin.js';
import Index from '../imports/ui/Layouts/Index.js';
import CharacterContainer from '../imports/ui/Components/Containers/CharacterContainer.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <App>
      <Switch>
        <Route exact path='/' component={Index} />
        <Route path='/admin' component={Admin} />
        <Route path='/charactercreation' component={CharacterContainer} />
      </Switch>
    </App>
  </Router>
);
