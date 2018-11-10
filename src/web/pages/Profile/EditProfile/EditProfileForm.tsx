/**
 * @class EditProfileForm
 * @description 
 */

import * as React from "react";
import { ApolloError } from "apollo-boost";

import { Form, Field, Text, FormData, FormError } from "src/web/components/Form";
import { IProfileInput, IProfile } from "src/api/app/schemas/profile/types";

const styles = require('./editProfile.scss');

interface UpdateProfileArgs {
  variables: {
    id: string;
    input: IProfileInput;
  }
}

export interface Props {
  updateProfile(args: UpdateProfileArgs): Promise<any>;
  data: IProfile | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  profile: IProfile;
}

interface State {
}

class EditProfileForm extends React.Component<Props, State> {
  public componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.data) {
      console.log('******* should close modal!!! *******');
    }
  }

  private onSubmit: (data: FormData) => void = (data) => {
    const { profile, updateProfile } = this.props;

    updateProfile({ variables: { id: profile.id, input: data as IProfileInput }});
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
          <Field field="name" label="Name" compact={true}>
            <Text value={profile.name} />
          </Field>

          <Field field="description" label="Description" compact={true}>
            <Text value={profile.description} />
          </Field>

          {errorElement}

          {button}
        </Form>
      </div>
    );
  }
}

export default EditProfileForm;