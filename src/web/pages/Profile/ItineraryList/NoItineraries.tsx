/**
 * @class NoItineraries
 * @description 
 */

import * as React from "react";

export interface Props {
}

const NoItineraries: React.SFC<Props> = () => {
  return (
    <div>
      <h4>You have no itineraries</h4>
      <button>+ Add one</button>
    </div>
  );
};

export default NoItineraries;