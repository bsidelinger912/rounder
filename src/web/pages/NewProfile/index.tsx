/**
 * @class NewProfile
 * @description create a new artist
 */

import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import { RouteComponentProps } from 'react-router';

import { IProfile, IProfileInput } from 'src/api/app/schemas/profile/types';
import ProfileForm from 'src/web/components/ProfileForm';

const styles = require('./newProfile.scss');

interface Props extends RouteComponentProps {
}

const CreateProfile = gql`
  mutation CreateProfile($input: ProFileInput!) {
    createProfile(input: $input) {
      id
      name
      description
    }
  }
`;

class CreateProfileMutation extends Mutation<IProfile, { input: IProfileInput }>{}

export const NewProfile: React.SFC<Props> = ({ history }) => {
  const onSuccess = () => history.push('/');
  
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h3 className={styles.pageHeaderTitle}>Create a new Profile</h3>
        </div>
      </div>
      <div className={styles.form}>
      <CreateProfileMutation mutation={CreateProfile}>
        {(updateProfile, { data, loading, error }) => (
          <ProfileForm {...{ submit: updateProfile, data, loading, error, onSuccess }} />
        )}
      </CreateProfileMutation>
      </div>
    </div>
  );
};

export default NewProfile;
