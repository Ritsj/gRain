import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Dev from './components/Dev';

import './custom.css';

export default () => (
  <Layout>
    <Route exact path='/' component={Dev} />
  </Layout>
);
