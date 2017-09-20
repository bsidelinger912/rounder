import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';

import SignupOrLogin from 'web/components/SignupOrLogin';

import container from 'containers/HomeContainer';

import styles from './home.scss';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const contextTypes = {
  apiClient: PropTypes.object,
};

const Home = ({ loggedIn }, { apiClient }) => {
  const component = loggedIn ? (
    <div>
      you are logged in <a onClick={apiClient.logout}>logout</a>
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
Home.contextTypes = contextTypes;

export default container(Home);
