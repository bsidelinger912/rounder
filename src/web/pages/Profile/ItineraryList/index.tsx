/**
 * @class ItineraryList
 * @description 
 */

import * as React from "react";

import { IItinerary } from "src/api/app/schemas/itinerary/types";

import NoInineraries from './NoItineraries';
import ItineraryItem from "./ItineraryItem";

const styles = require('./itineraryList.scss');

export interface Props {
  itineraries: IItinerary[];
  profileId: string;
}

const ItineraryList: React.SFC<Props> = ({ itineraries, profileId }) => {
  if (itineraries.length < 1) {
    return (
      <NoInineraries {...{ profileId }} />
    );
  } 

  return (
    <div className={styles.grid}>
      {itineraries.map(itin => <div><ItineraryItem {...itin} /></div>)}
    </div>
  )
};

export default ItineraryList;
