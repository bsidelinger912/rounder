/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import container from 'containers/DashboardContainer';
import styles from './dashboard.scss';

const propTypes = {
  // test: PropTypes.number.isRequired,
};

const contextTypes = {
  apiClient: PropTypes.object,
};

export const Welcome = (props, { apiClient }) => (
  <div className={styles.main}>
    Welcome dude
    <br />
    <Link to={'/new-artist'}>+ New artist</Link>
    <div>
      you are logged in <a onClick={apiClient.logout}>logout</a>
    </div>
  </div>
);

Welcome.propTypes = propTypes;
Welcome.contextTypes = contextTypes;

export default container(Welcome);
