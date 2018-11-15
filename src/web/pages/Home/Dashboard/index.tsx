/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

import SingleProfileDashboard from './SingleProfile';
import MultiProfileDashboard from './MultiProfile';
import NewProfile from '../../NewProfile';

const styles = require('./dashboard.scss');

interface Props extends RouteComponentProps {
}

export const UserQuery = gql`
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

export const Welcome: React.SFC<Props> = (props) => (
  <Query query={UserQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      let content;

      if (data.user.profiles.length > 1) {
        content = (
          <MultiProfileDashboard profiles={data.user.profiles} />
        );
      } else if (data.user.profiles.length > 0) {
        content = (
          <SingleProfileDashboard profile={data.user.profiles[0]} />
        );
      } else {
        content = (
          <div>
            <NewProfile {...props} firstProfile={true} />
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
