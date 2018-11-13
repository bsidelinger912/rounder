/**
 * @class DeleteProfileButton
 * @description 
 */

import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { IProfile } from "src/api/app/schemas/profile/types";

export interface Props {
  id: string;
}

const DeleteProfile = gql`
  mutation DeleteProfile($id: ID!) {
    deleteProfile(id: $id) {
      id
      name
      description
    }
  }
`;

class DeleteProfileMutation extends Mutation<IProfile, { id: string; }>{}

const DeleteProfileButton: React.SFC<Props> = ({ id }) => {
  return (
    <DeleteProfileMutation mutation={DeleteProfile} variables={{ id }}>
      {(deleteProfile, { loading, error }) => {
        if (error) {
          alert('there was an error deleting the profile');
        }
        
        const text = loading ? 'Deleting...' : 'Delete';
        
        return <button disabled={!!loading} onClick={() => deleteProfile({ variables: { id } })}>{text}</button>;
      }}
    </DeleteProfileMutation>
  );
};

export default DeleteProfileButton;