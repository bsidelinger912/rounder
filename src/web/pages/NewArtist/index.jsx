/**
 * @class NewArtist
 * @description create a new artist
 */

import React from 'react';
// import PropTypes from 'prop-types';

import styles from './NewArtist.scss';

const propTypes = {
  // test: PropTypes.number.isRequired,
};

export const NewArtist = () => (
  <div className={styles.main}>
    Create a new artist
  </div>
);

NewArtist.propTypes = propTypes;

export default NewArtist;
