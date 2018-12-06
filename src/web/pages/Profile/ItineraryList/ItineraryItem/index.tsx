/**
 * @class ItineraryItem
 * @description 
 */

import * as React from "react";
import { Link } from "react-router-dom";

import { IItinerary } from "src/api/app/schemas/itinerary/types";
import DeleteItineraryButton from 'src/web/components/DeleteItineraryButton';

const styles = require('./itineraryItem.scss');

export interface Props extends IItinerary {
}

const ItineraryItem: React.SFC<Props> = ({ name, description, id }) => {
  return (
    <Link to={`/itineraries/${id}`} className={styles.wrapper}>
      <h4>{name}</h4>
      <p>{description}</p>

      <div className={styles.buttons}>
        <DeleteItineraryButton id={id} />
      </div>
    </Link>
  );
};

export default ItineraryItem;