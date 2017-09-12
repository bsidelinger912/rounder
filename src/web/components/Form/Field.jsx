/**
 * @class Field
 * @description
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export class Field extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    field: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    label: undefined,
  }

  static childContextTypes = {
    field: PropTypes.string,
  }

  static contextTypes = {
    validationErrors: PropTypes.object,
  }

  getChildContext() {
    return { field: this.props.field };
  }

  render() {
    const { children, label, field } = this.props;
    const { validationErrors } = this.context;

    const labelElem = label ? <label htmlFor={field}>{label}</label> : null;

    return (
      <div className={styles.formRow}>
        {labelElem}
        {children}
      </div>
    );
  }
}

export default Field;
