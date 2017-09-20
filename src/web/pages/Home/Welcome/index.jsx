/**
 * @class Welcome
 * @description first thing you see after logging in
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './welcome.scss';

const propTypes = {
  test: PropTypes.number.isRequired,
};

export const Welcome = () => (
  <div className={styles.main}>
    Welcome dude
  </div>
);

Welcome.propTypes = propTypes;

export default Welcome;
