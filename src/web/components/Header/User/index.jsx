/**
 * @class User
 * @description
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';

import userContainer from 'containers/UserContainer';
import styles from './user.scss';

const propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const contextTypes = {
  apiClient: PropTypes.object,
};

export const User = ({ profile }, { apiClient }) => {
  // TODO: do we need this???
  if (!profile.email) {
    return null;
  }

  const firstLetter = ((profile.firstName)
    ? profile.firstName.charAt(0)
    : profile.email.charAt(0)).toUpperCase();

  const tooltipContent = (
    <div>
      <div className={styles.tooltipHeading}>
        {profile.email}
      </div>

      <button onClick={apiClient.logout} className={styles.logout}>Logout</button>
    </div>
  );

  return (
    <div className={styles.main}>
      <Tooltip content={tooltipContent} className={styles.circle} eventToggle="onClick">
        {firstLetter}
      </Tooltip>
    </div>
  );
};

User.propTypes = propTypes;
User.contextTypes = contextTypes;

export default userContainer(User);
