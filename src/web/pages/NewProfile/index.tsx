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
import { UserQuery } from '../Home/Dashboard';

const styles = require('./newProfile.scss');

interface Props extends RouteComponentProps {
  firstProfile?: boolean;
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

export const NewProfile: React.SFC<Props> = ({ history, firstProfile }) => {
  const onSuccess = () => history.push('/');

  const message = firstProfile ? (
    <>
      <h4>To get started, create your first profile</h4>
      <p>
        A profile can be an individual or a group, more great info coming....
      </p>
    </>
  ) : null;
  
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h3 className={styles.pageHeaderTitle}>Create a new Profile</h3>
        </div>
      </div>
      <div className={styles.form}>
      <CreateProfileMutation 
        mutation={CreateProfile}
        update={(cache, { data }) => {
          const { user } = cache.readQuery({ query: UserQuery }) as any;
          
          const profile = (data as any).createProfile;
          user.profiles = user.profiles.concat(profile);
          cache.writeQuery({
            query: UserQuery,
            data: { user }
          })
        }}
      >
        {(updateProfile, { data, loading, error }) => (
          <>
            {message}
            <ProfileForm {...{ submit: updateProfile, data, loading, error, onSuccess }} />
          </>
        )}
      </CreateProfileMutation>
      </div>
    </div>
  );
};

export default NewProfile;
