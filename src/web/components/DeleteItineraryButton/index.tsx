/**
 * @class DeleteItineraryButton
 * @description 
 */

import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';

import Tooltip from 'src/web/components/Tooltip';
import { IItinerary } from 'src/api/app/schemas/itinerary/types';
import IconButton, { IconType } from 'src/web/components/IconButton';
// import ItineraryDeletedNotification from './ItineraryDeletedNotification';

export interface Props {
  id: string;
}

interface ButtonProps {
  id: string;
  deleteItinerary: MutationFn<IItinerary, { id: string; }>;
  error: ApolloError | undefined;
  loading: boolean;
}

const DeleteItinerary = gql`
  mutation DeleteItinerary($id: ID!) {
    deleteItinerary(id: $id) {
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

  private delete: (e: React.MouseEvent) => Promise<void> = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { deleteItinerary, id } = this.props;

    await deleteItinerary({ variables: { id } });
    alert('itin deleted!');
    /* const notificationId = toast(<ItineraryDeletedNotification id={id} cancelNotification={this.cancelNotification} />);

    this.setState({ notificationId });*/
  }

  /* private cancelNotification: () => void = () => {
    toast.dismiss(this.state.notificationId);
  }*/

  public render(): JSX.Element {
    return (
      <Tooltip content="Delete Itinerary">
        <IconButton iconType={IconType.Trash} loading={this.props.loading} onClick={this.delete} />
      </Tooltip>
    );
  }
}

class DeleteItineraryMutation extends Mutation<IItinerary, { id: string; }>{}

const DeleteItineraryButton: React.SFC<Props> = ({ id }) => {
  return (
    <DeleteItineraryMutation 
      mutation={DeleteItinerary} 
      variables={{ id }}
      /* update={(cache) => {
        const { user } = cache.readQuery({ query: UserQuery }) as any;

        const index = user.profiles.indexOf((itinerary: IItinerary) => profile.id === id);
        user.profiles.splice(index, 1);
        
        cache.writeQuery({
          query: UserQuery,
          data: { user }
        })
      }}*/
    >
      {(deleteItinerary, { loading, error }) => {
        return <DeleteButton {...{ id, loading, error, deleteItinerary }} />;
      }}
    </DeleteItineraryMutation>
  );
};

export default DeleteItineraryButton;