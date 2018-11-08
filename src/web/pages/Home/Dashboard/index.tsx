/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProfileForm from 'src/web/components/ProfileForm';
import SingleProfileDashboard from 'src/web/pages/Home/Dashboard/SingleProfile';

const styles = require('./dashboard.scss');

const propTypes = {};

const contextTypes = {
  authClient: PropTypes.object,
};

export const Welcome: React.SFC<any> = (props, { authClient }) => (
  <Query
    query={gql`
      {
        getUser(id: "5bdbe0e075d95e8db4a80bfb") {
          email
          id
          profiles {
            name
            description
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      let content;

      if (data.getUser.profiles.length > 1) {
        content = (
          <div>Multi profile dashboard coming....</div>
        );
      } else if (data.getUser.profiles.length > 0) {
        content = (
          <SingleProfileDashboard profile={data.getUser.profiles[0]} />
        );
      } else {
        content = (
          <div>
            <h4>To get started, create your first profile</h4>
            <p>
              A profile can be an individual or a group
            </p>

            <ProfileForm />
          </div>
        );
      }


      return (
        <div className={styles.main}>
          <h1>Welcome</h1>

          {content}

          <div>
            you are logged in <a onClick={authClient.logout}>logout</a>
          </div>
        </div>
      );
    }}
  </Query>
);

Welcome.propTypes = propTypes;
Welcome.contextTypes = contextTypes;

export default Welcome;
