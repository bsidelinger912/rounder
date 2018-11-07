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
  user: PropTypes.shape({
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const contextTypes = {
  authClient: PropTypes.object,
};

export const User = ({ user: { profile, loggedIn } }, { authClient }) => {
  // TODO: do we need this???
  if (!loggedIn || !profile.email) {
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

      <button onClick={authClient.logout} className={styles.logout}>Logout</button>
    </div>
  );

  return (
    <div className={styles.main}>
      <Tooltip content={tooltipContent} className={styles.tooltip} eventToggle="onClick">
        <div className={styles.circle}>
          {firstLetter}
        </div>
      </Tooltip>
    </div>
  );
};

User.propTypes = propTypes;
User.contextTypes = contextTypes;

export default userContainer(User);
