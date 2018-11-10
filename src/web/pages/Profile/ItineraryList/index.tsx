/**
 * @class ItineraryList
 * @description 
 */

import * as React from "react";

import { IItinerary } from "src/api/app/schemas/itinerary/types";

import NoInineraries from './NoItineraries';

export interface Props {
  itineraries: IItinerary[];
}

const ItineraryList: React.SFC<Props> = ({ itineraries }) => {
  if (itineraries.length < 1) {
    return (
      <NoInineraries />
    );
  } 

  if (itineraries.length < 2) {
    return <div>sigle itinerary</div>;
  }

  return (
    <div>many itineraries</div>
  );
};

export default ItineraryList;
