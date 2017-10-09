import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';

import userContainer from 'containers/UserContainer';
import SignupOrLogin from 'web/components/SignupOrLogin';
import Dashboard from './Dashboard';

import styles from './home.scss';

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const Home = ({ loggedIn }) => {
  const component = loggedIn ? <Dashboard /> : <SignupOrLogin />;

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        {component}
      </div>
    </main>
  );
};

Home.propTypes = propTypes;

export default userContainer(Home);
