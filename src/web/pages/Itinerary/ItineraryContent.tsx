/**
 * @class ItineraryContent
 * @description 
 */

import * as React from "react";

import { IItinerary } from "src/api/app/schemas/itinerary/types";

export interface Props extends IItinerary {
}

const ItineraryContent: React.SFC<Props> = ({ name }) => {
  return (
    <div>
      {name}
    </div>
  );
};

export default ItineraryContent;