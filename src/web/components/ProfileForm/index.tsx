/**
 * @class ProfileForm
 * @description 
 */

import * as React from "react";
import { ApolloError } from "apollo-boost";

import { Form, Field, Text, FormData, FormError } from "src/web/components/Form";
import { IProfileInput, IProfile } from "src/api/app/schemas/profile/types";

const styles = require('./profileForm.scss');

interface UpdateProfileArgs {
  variables: { id: string; input: IProfileInput; } | { input: IProfileInput };
}

export interface Props {
  submit(args: UpdateProfileArgs): Promise<any>;
  onSuccess?(data?: IProfileInput): void;
  data: IProfile | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  profile?: IProfile;
}

interface State {
}

class ProfileForm extends React.Component<Props, State> {
  private onSubmit: (data: FormData) => Promise<void> = async (data) => {
    const { profile, submit, onSuccess } = this.props;

    const variables = profile 
      ? { id: profile.id, input: data as IProfileInput }
      : { input: data as IProfileInput };

    try {
      await submit({ variables });
      onSuccess && onSuccess(data as IProfileInput);
    } catch(e) {

    }
  }

  public render():JSX.Element {
    const { profile, error, loading } = this.props;

    const errorElement = error && <FormError>{error.message}</FormError>;

    const button = loading ? (
      <div>
        <button className="button-primary" type="submit" disabled>Loading...</button>
      </div>
    ) : (
      <div>
        <button className="button-primary" type="submit">Save</button>
      </div>
    );

    return (
      <div className={styles.main}>
        <Form
          onSubmit={this.onSubmit}
        >
          <Field field="name" label="Name">
            <Text value={profile && profile.name} />
          </Field>

          <Field field="description" label="Description">
            <Text value={profile && profile.description} />
          </Field>

          {errorElement}

          {button}
        </Form>
      </div>
    );
  }
}

export default ProfileForm;