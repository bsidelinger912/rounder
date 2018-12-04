/**
 * @class NewItinerary
 * @description 
 */

import * as React from "react";
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";

import ItineraryForm from "src/web/components/ItineraryForm";
import { IItinerary, IItineraryInput } from "src/api/app/schemas/itinerary/types";

export interface Props {
  profileId: string;
}

interface State {
}

const CreateItinerary = gql`
  mutation CreateItinerary($input: ItineraryInput!, $profileId: ID!) {
    createItinerary(input: $input, profileId: $profileId) {
      id
      name
      description
    }
  }
`;

class CreateItineraryMutation extends Mutation<IItinerary, { input: IItineraryInput, profileId: string }>{}

class NewItinerary extends React.Component<Props, State> {
  public render():JSX.Element {
    const { profileId } = this.props;

    return (
      <div>
        <CreateItineraryMutation 
          mutation={CreateItinerary}
          update={(cache, { data }) => {
            /* const { user } = cache.readQuery({ query: UserQuery }) as any;
            
            const profile = (data as any).createProfile;
            user.profiles = user.profiles.concat(profile);
            cache.writeQuery({
              query: UserQuery,
              data: { user }
            })*/
          }}
        >
          {(createItinerary, { data, loading, error }) => (
            <>
              <ItineraryForm {...{ submit: createItinerary, data, loading, error, profileId }} />
            </>
          )}
        </CreateItineraryMutation>
      </div>
    );
  }
}

export default NewItinerary;