/**
 * @class ProfileForm
 * @description
 */

import * as React from 'react';
// import * as PropTypes from 'prop-types';

import { Form, Text, Field } from '../Form';

const styles = require('./profileForm.scss');

function validate(data: any) {
  const errors: any = {};

  if (!data.name) {
    errors.email = 'Name is Required';
  }

  return errors;
}

export class ProfileForm extends React.Component<any, any> {
  static propTypes = {
    // test: PropTypes.number.isRequired,
  }

  constructor(props: any) {
    super(props);

    this.state = { loading: false };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data: any) {
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
