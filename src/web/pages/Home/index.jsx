import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';

import SignupOrLogin from 'web/components/SignupOrLogin';

import container from 'containers/HomeContainer';

import styles from './home.scss';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const Home = ({ loggedIn }) => {
  const component = loggedIn ? (
    <div>
      you are logged in
    </div>
  ) : <SignupOrLogin />;

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        {component}
      </div>
    </main>
  );
};

Home.propTypes = propTypes;

export default container(Home);
