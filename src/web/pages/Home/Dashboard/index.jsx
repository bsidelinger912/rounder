/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';

import userContainer from 'containers/UserContainer';

import ProfileForm from 'web/components/ProfileForm';

import styles from './dashboard.scss';

const propTypes = {
  // test: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

const contextTypes = {
  apiClient: PropTypes.object,
};

export const Welcome = (props, { apiClient }) => {
  const { user: { profile: { profiles } } } = props;

  const content = profiles.length > 0 ? (
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
        you are logged in <a onClick={apiClient.logout}>logout</a>
      </div>
    </div>
  );
};

Welcome.propTypes = propTypes;
Welcome.contextTypes = contextTypes;

export default userContainer(Welcome);
