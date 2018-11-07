import * as React from 'react';
import * as PropTypes from 'prop-types';
// import { Link } from 'react-router';

import userContainer from 'src/containers/UserContainer';
// import SignupOrLogin from 'src/web/components/SignupOrLogin';
// import Dashboard from './Dashboard';

const styles = require('./home.scss');

const propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const Home: React.SFC<any> = ({ user: { loggedIn } }) => {
  const component = <div>hello</div>; // loggedIn ? <Dashboard /> : <SignupOrLogin />;

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
