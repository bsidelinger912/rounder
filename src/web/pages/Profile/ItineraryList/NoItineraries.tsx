/**
 * @class NoItineraries
 * @description 
 */

import * as React from "react";

import NewItinerary from "src/web/components/ItineraryForm/NewItinerary";

export interface Props {
  profileId: string;
}

const NoItineraries: React.SFC<Props> = ({ profileId }) => {
  return (
    <div>
      <h4>Create an itinerary</h4>
      <p>
        An itinerary is a trip or tour.
      </p>
      
      <NewItinerary profileId={profileId} />
    </div>
  );
};

export default NoItineraries;