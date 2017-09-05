import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router';

import container from 'containers/HomeContainer';

import styles from './home.scss';

const propTypes = {
  // trips: PropTypes.array.isRequired,
};

const Home = () => (
  <main className={styles.main}>
    <h1>Hello</h1>
  </main>
);

Home.propTypes = propTypes;

export default container(Home);
