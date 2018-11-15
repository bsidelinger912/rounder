/**
 * @class DeleteProfileButton
 * @description 
 */

import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';

import { IProfile } from 'src/api/app/schemas/profile/types';
import IconButton, { IconType } from 'src/web/components/IconButton';
import { UserQuery } from 'src/web/pages/Home/Dashboard';
import ProfileDeletedNotification from './ProfileDeletedNotification';

export interface Props {
  id: string;
}

interface ButtonProps {
  id: string;
  deleteProfile: MutationFn<IProfile, { id: string; }>;
  error: ApolloError | undefined;
  loading: boolean;
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

class DeleteButton extends React.Component<ButtonProps, { notificationId?: number }> {
  constructor(props: ButtonProps) {
    super(props);

    this.state = {};
  }
  
  public componentWillReceiveProps(nextProps: ButtonProps) {
    if (nextProps.error && !this.props.error) {
      toast.error('there was an error deleting the profile');
    }
  }

  private delete: (e: React.MouseEvent) => void = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { deleteProfile, id } = this.props;

    deleteProfile({ variables: { id } });
    const notificationId = toast(<ProfileDeletedNotification id={id} cancelNotification={this.cancelNotification} />);

    this.setState({ notificationId });
  }

  private cancelNotification: () => void = () => {
    toast.dismiss(this.state.notificationId);
  }

  public render(): JSX.Element {
    return <IconButton iconType={IconType.Trash} loading={this.props.loading} onClick={this.delete} />;
  }
}

class DeleteProfileMutation extends Mutation<IProfile, { id: string; }>{}

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
        return <DeleteButton {...{ id, loading, error, deleteProfile }} />;
      }}
    </DeleteProfileMutation>
  );
};

export default DeleteProfileButton;