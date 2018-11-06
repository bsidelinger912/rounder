/**
 * @class NewProfile
 * @description create a new artist
 */

import React from 'react';
// import PropTypes from 'prop-types';

import styles from './newProfile.scss';

const propTypes = {
  // test: PropTypes.number.isRequired,
};

export const NewProfile = () => (
  <div className={styles.main}>
    Create a new Profile
  </div>
);

NewProfile.propTypes = propTypes;

export default NewProfile;
