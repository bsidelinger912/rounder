/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import userContainer from 'containers/UserContainer';
import styles from './dashboard.scss';

const propTypes = {
  // test: PropTypes.number.isRequired,
};

const contextTypes = {
  apiClient: PropTypes.object,
};

export const Welcome = (props, { apiClient }) => (
  <div className={styles.main}>
    <h1>Welcome</h1>

    <Link className={styles.newEntity} to={'/new-artist'}>
      <button className="button-primary">+ Add your first Rounder</button>
    </Link>

    <h3>What is a Rounder?</h3>

    <p className={styles.introText}>
      A Rounder can be many things, depending on who you ask.
      But here a Rounder is an artist, a band, an author on a book tour; anything or anyone that has a schedule
      to be maintained, organized and publicized.
    </p>
    <p>You can have just one, or you can maintain the schedules of many.
      Either way, the first step is to add your first Rounder, you&apos;ll always be able to add more later.
    </p>

    <br /><br /><br />
    <div>
      you are logged in <a onClick={apiClient.logout}>logout</a>
    </div>
  </div>
);

Welcome.propTypes = propTypes;
Welcome.contextTypes = contextTypes;

export default userContainer(Welcome);
