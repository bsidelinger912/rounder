/**
 * @class Signup
 * @description
 */

import React from 'react';
// import PropTypes from 'prop-types';

import { Form, Text, Field } from '../Form';

import styles from './signupOrLogin.scss';

function validate(data) {
  const errors = {};

  if (!data.email) {
    errors.email = 'Email is Required';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

export class Signup extends React.Component {
  static propTypes = {
    // test: PropTypes.number.isRequired,
  }

  constructor() {
    super();

    this.action = 'login';

    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleSubmit(data) {
    // call API
    const url = this.action === 'signup' ? 'http://localhost:4000/signup' : 'http://localhost:4000/login';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch(err => console.error(err));
  }

  signup() {
    this.action = 'signup';
  }

  login() {
    this.action = 'login';
  }

  render() {
    return (
      <div>
        <h2 className={styles.heading}>Sign up or log in</h2>
        <Form onSubmit={this.handleSubmit} validation={validate}>
          <Field field="email" label="Email">
            <Text />
          </Field>

          <Field field="password" label="Password">
            <Text />
          </Field>

          <div className={styles.buttonRow}>
            <button className="button-primary" onClick={this.login}>Login</button>
            <button className="button-primary" onClick={this.signup}>Sign Up</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Signup;
