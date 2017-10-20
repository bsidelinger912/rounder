import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';

import userContainer from 'containers/UserContainer';
import SignupOrLogin from 'web/components/SignupOrLogin';
import Dashboard from './Dashboard';

import styles from './home.scss';

const propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const Home = ({ user: { loggedIn } }) => {
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
