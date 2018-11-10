/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProfileForm from 'src/web/components/ProfileForm';
import SingleProfileDashboard from 'src/web/pages/Home/Dashboard/SingleProfile';

const styles = require('./dashboard.scss');

const UserQuery = gql`
  {
    user {
      email
      id
      profiles {
        id
        name
        description
      }
    }
  }
`;

export const Welcome: React.SFC<any> = (props, { authClient }) => (
  <Query query={UserQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      let content;

      if (data.user.profiles.length > 1) {
        content = (
          <div>Multi profile dashboard coming....</div>
        );
      } else if (data.user.profiles.length > 0) {
        content = (
          <SingleProfileDashboard profile={data.user.profiles[0]} />
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
          {content}
        </div>
      );
    }}
  </Query>
);

export default Welcome;
