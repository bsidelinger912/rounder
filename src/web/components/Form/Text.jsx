/**
 * @class Text
 * @description
 */

import React from 'react';
import PropTypes from 'prop-types';

// import styles from './className.scss';

export class Text extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  }

  static defaultProps = {
    value: '',
  }

  static contextTypes = {
    field: PropTypes.string,
  }

  render() {
    const { value } = this.props;
    const { field } = this.context;

    return (
      <input type="text" defaultValue={value} name={field} id={field} />
    );
  }
}

export default Text;
