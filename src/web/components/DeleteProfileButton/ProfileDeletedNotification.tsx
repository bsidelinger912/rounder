/**
 * @class ProfileDeletedNotification
 * @description 
 */

import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';

import { IProfile } from "src/api/app/schemas/profile/types";
import { UserQuery } from "src/web/pages/Home/Dashboard";

export interface Props {
  id: string;
  cancelNotification: () => void;
}

interface ContentProps {
  id: string;
  restoreProfile: MutationFn<IProfile, { id: string; }>;
  error: ApolloError | undefined;
  loading: boolean;
  cancelNotification: () => void;
}

const RestoreProfile = gql`
  mutation RestoreProfile($id: ID!) {
    restoreProfile(id: $id) {
      id
      name
      description
    }
  }
`;

class Content extends React.Component<ContentProps, {}> {
  public componentWillReceiveProps(nextProps: ContentProps) {
    if (nextProps.error && !this.props.error) {
      toast.error('there was an error restoring the profile');
    }
  }

  private restore: (e: React.MouseEvent) => void = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { loading, restoreProfile, id, cancelNotification } = this.props;

    if (loading) {
      return;
    }

    restoreProfile({ variables: { id } });
    cancelNotification();
  }

  public render(): JSX.Element {
    return <span>The profile has been deleted.  <a onClick={this.restore}>undo</a></span>;
  }
}

class RestoreProfileMutation extends Mutation<IProfile, { id: string; }>{}

const ProfileDeletedNotification: React.SFC<Props> = ({ id, cancelNotification }) => {
  return (
    <RestoreProfileMutation 
      mutation={RestoreProfile} 
      variables={{ id }}
      update={(cache, profile) => {
        const { user } = cache.readQuery({ query: UserQuery }) as any;

        user.profiles.push((profile.data as any).restoreProfile);
        
        cache.writeQuery({
          query: UserQuery,
          data: { user }
        })
      }}
    >
      {(restoreProfile, { loading, error }) => {
        return <Content {...{ id, loading, error, restoreProfile, cancelNotification }} />;
      }}
    </RestoreProfileMutation>
  );
};

export default ProfileDeletedNotification;