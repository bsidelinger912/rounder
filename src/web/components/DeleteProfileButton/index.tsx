/**
 * @class DeleteProfileButton
 * @description 
 */

import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { toast } from 'react-toastify';

import { IProfile } from "src/api/app/schemas/profile/types";
import IconButton, { IconType } from "src/web/components/IconButton";
import { UserQuery } from "src/web/pages/Home/Dashboard";

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

const RestoreProfile = gql`
mutation RestoreProfile($id: ID!) {
  restoreProfile(id: $id) {
    id
    name
    description
  }
}
`;

class DeleteProfileMutation extends Mutation<IProfile, { id: string; }>{}
class RestoreProfileMutation extends Mutation<IProfile, { id: string; }>{}

const ProfileDeletedToast: React.SFC<Props> = ({ id }) => {
  return (
    <RestoreProfileMutation 
      mutation={RestoreProfile} 
      variables={{ id }}
      update={(cache) => {
        const { user } = cache.readQuery({ query: UserQuery }) as any;

        const index = user.profiles.indexOf((profile: IProfile) => profile.id === id);
        user.profiles.splice(index, 1);
        
        cache.writeQuery({
          query: UserQuery,
          data: { user }
        })
      }}
    >
      {(restoreProfile, { loading, error }) => {
        if (error) {
          console.error(error);
          toast.error('there was an error restoring the profile');
        }

        const restoreMethod = () => {
          if (loading) {
            return;
          }
          restoreProfile({ variables: { id } });
        };

        return <span>The profile has been deleted.  <a onClick={restoreMethod}>undo</a></span>;
      }}
    </RestoreProfileMutation>
  );
};

const DeleteProfileButton: React.SFC<Props> = ({ id }) => {
  return (
    <DeleteProfileMutation 
      mutation={DeleteProfile} 
      variables={{ id }}
      update={(cache) => {
        const { user } = cache.readQuery({ query: UserQuery }) as any;

        const index = user.profiles.indexOf((profile: IProfile) => profile.id === id);
        user.profiles.splice(index, 1);
        
        cache.writeQuery({
          query: UserQuery,
          data: { user }
        })
      }}
    >
      {(deleteProfile, { loading, error }) => {
        if (error) {
          console.error(error);
          toast.error('there was an error deleting the profile');
        }

        const deleteMethod = () => {
          deleteProfile({ variables: { id } });
          toast(<ProfileDeletedToast id={id} />);
        };
        
        return <IconButton iconType={IconType.Trash} loading={loading} onClick={deleteMethod} />;
      }}
    </DeleteProfileMutation>
  );
};

export default DeleteProfileButton;