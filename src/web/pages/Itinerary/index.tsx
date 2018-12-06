/**
 * @class Itinerary
 * @description 
 */

import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Query } from "react-apollo";
import gql from 'graphql-tag';

import { IItinerary } from "src/api/app/schemas/itinerary/types";
import ItineraryContent from './ItineraryContent';

interface QueryProps {
  itineraryId: string;
}

interface Props extends RouteComponentProps<QueryProps> {}

interface Data {
  itinerary: IItinerary;
}

class ItineraryQuery extends Query<Data, QueryProps>{}

const ItineraryFragment = gql`
  query Itinerary($itineraryId: ID!) {
    itinerary(id: $itineraryId) {
      id
      name
      description
      profile {
        name
      }
    }
  }
`;

const Itinerary: React.SFC<Props> = (props) => {
  const itineraryId = props.match.params.itineraryId;

  return (
    <ItineraryQuery
      query={ItineraryFragment}
      variables={{ itineraryId }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error || !data) return <p>Error :(</p>;

        return (
          <ItineraryContent {...data.itinerary} />
        );
      }}
    </ItineraryQuery>
  );
};

export default Itinerary;