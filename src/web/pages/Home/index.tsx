import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import userContainer from 'src/containers/UserContainer';
import SignupOrLogin from 'src/web/components/SignupOrLogin';
import Dashboard from './Dashboard';

const styles = require('./home.scss');

interface Props extends RouteComponentProps {
  user: {
    loggedIn?: boolean;
  }
}

const Home: React.SFC<Props> = (props) => {
  const { user: { loggedIn }, ...rest } = props;

  const component = loggedIn ? <Dashboard {...rest} /> : (
    <div className={styles.form}>
      <SignupOrLogin />
    </div>
  );

  return (
    <main className={styles.main}>
      {component}
    </main>
  );
};

export default userContainer(Home);
