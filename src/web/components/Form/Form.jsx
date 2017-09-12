/**
 * @class Form
 * @description
 */

import React from 'react';
import PropTypes from 'prop-types';

// import styles from './form.scss';

export class Form extends React.Component {
  static propTypes = {
    validation: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    validation: null,
    onSubmit: () => {},
  }

  static childContextTypes = {
    validationErrors: PropTypes.object,
  }

  constructor() {
    super();

    this.formElement = null;

    this.state = { validationErrors: {} };

    this.onSubmit = this.onSubmit.bind(this);
  }

  getChildContext() {
    return { field: this.state.validationErrors };
  }

  onSubmit(e) {
    e.preventDefault();

    const validation = this.validate();

    if (Object.keys(validation).length > 0) {
      this.setState({ validationErrors: validation });
    } else {
      const data = this.serialize();
      this.props.onSubmit(data, e);
    }
  }

  validate() {
    const data = this.serialize();
    let validation = {};

    if (this.props.validation) {
      validation = this.props.validation(data);
    }

    return validation;
  }

  serialize() {
    const data = new FormData(this.formElement);

    return data;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} ref={(form) => { this.formElement = form; }}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;
