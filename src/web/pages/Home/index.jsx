import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router';

import SignupOrLogin from 'web/components/SignupOrLogin';

import container from 'containers/HomeContainer';

import styles from './home.scss';

const propTypes = {
  // trips: PropTypes.array.isRequired,
};

const Home = () => (
  <main className={styles.main}>
    <div className={styles.form}>
      <SignupOrLogin />
    </div>
  </main>
);

Home.propTypes = propTypes;

export default container(Home);
