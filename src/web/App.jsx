import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/web/components/Header';
import fetchUserContainer from 'src/containers/FetchUserContainer';

import './client/scss/base.global.scss';
import './client/scss/vendor.global.scss';
import styles from './app.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const App = ({ children }) => (
  <div className={styles.main}>
    <Header />
    {children}
  </div>
);

App.propTypes = propTypes;

export default fetchUserContainer(App);
