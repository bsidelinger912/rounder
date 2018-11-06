/**
 * @class ProfileForm
 * @description
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Form, Text, Field } from '../Form';

import styles from './profileForm.scss';

function validate(data) {
  const errors = {};

  if (!data.name) {
    errors.email = 'Name is Required';
  }

  return errors;
}

export class ProfileForm extends React.Component {
  static propTypes = {
    // test: PropTypes.number.isRequired,
  }

  static contextTypes = {
    apiClient: PropTypes.object,
  };

  constructor() {
    super();

    this.state = { loading: false };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    console.log(data);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} validation={validate}>
        <Field field="name" label="Name">
          <Text />
        </Field>

        <Field field="description" label="Description">
          <Text />
        </Field>

        <div className={styles.buttonRow}>
          <button className="button-primary" type="submit">Save</button>
        </div>
      </Form>
    );
  }
}

export default ProfileForm;
