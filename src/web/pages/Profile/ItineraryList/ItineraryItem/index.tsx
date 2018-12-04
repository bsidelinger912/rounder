/**
 * @class ItineraryItem
 * @description 
 */

import * as React from "react";
import { IItinerary } from "src/api/app/schemas/itinerary/types";

const styles = require('./itineraryItem.scss');

export interface Props extends IItinerary {
}

const ItineraryItem: React.SFC<Props> = ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <h4>{name}</h4>
    </div>
  );
};

export default ItineraryItem;