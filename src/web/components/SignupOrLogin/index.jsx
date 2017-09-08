/**
 * @class Signup
 * @description
 */

import React from 'react';
// import PropTypes from 'prop-types';

import { Form, Text, Field } from '../Form';

// import styles from './signup.scss';

export class Signup extends React.Component {
  static propTypes = {
    // test: PropTypes.number.isRequired,
  }

  constructor() {
    super();

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  signup(e) {
    e.preventDefault();
  }

  login(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Form>
        <Field field="email" label="Email">
          <Text />
        </Field>

        <Field field="password" label="Password">
          <Text />
        </Field>

        <div>
          <button onClick={this.login}>Login</button>
          <button onClick={this.signup}>Sign Up</button>
        </div>
      </Form>
    );
  }
}

export default Signup;
