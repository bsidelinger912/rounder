/**
 * @class EditProfile
 * @description 
 */

import * as React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { IProfile, IProfileInput } from "src/api/app/schemas/profile/types";
import ProfileForm from "src/web/components/ProfileForm";

export interface Props {
  profile: IProfile;
}

const UpdateProfile = gql`
  mutation UpdateProfile($id: ID!, $input: ProFileInput!) {
    updateProfile(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

// TODO: why do i have to make id optional here??
class UpdateProfileMutation extends Mutation<IProfile, { id?: string; input: IProfileInput }>{}

const EditProfile: React.SFC<Props> = ({ profile }) => {
  return (
    <UpdateProfileMutation mutation={UpdateProfile}>
      {(updateProfile, { data, loading, error }) => (
        <ProfileForm {...{ submit: updateProfile, data, loading, error, profile }} />
      )}
    </UpdateProfileMutation>
  );
};

export default EditProfile;