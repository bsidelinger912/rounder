/**
 * @class Form
 * @description
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
const serialize = require('form-serialize');

// import styles from './form.scss';

export class Form extends React.Component<any, any> {
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

  private formElement: any

  constructor(props: any) {
    super(props);

    this.formElement = null;

    this.state = { validationErrors: {} };

    this.onSubmit = this.onSubmit.bind(this);
  }

  getChildContext() {
    return { validationErrors: this.state.validationErrors };
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.setState({ validationErrors: {} });

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
    const data = serialize(this.formElement, { hash: true });

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
