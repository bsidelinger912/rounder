/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import { Link } from 'react-router';

import ProfileForm from 'web/components/ProfileForm';

import styles from './dashboard.scss';

const propTypes = {
  // test: PropTypes.number.isRequired,
  // user: PropTypes.object.isRequired,
};

const contextTypes = {
  authClient: PropTypes.object,
};

export const Welcome = (props, { authClient }) => {
  return (
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

        const content = data.getUser.profiles.length > 0 ? (
          <div>you have profiles</div>
        ) : (
          <div>
            <h4>To get started, create your first profile</h4>
            <p>
              A profile can be an individual or a group
            </p>

            <ProfileForm />
          </div>
        );

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
};

Welcome.propTypes = propTypes;
Welcome.contextTypes = contextTypes;

export default Welcome;
