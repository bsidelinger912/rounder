import { IWaypoint } from '../waypoint/types';

export interface IItinerary {
  name: string;
  description?: string;
  waypoints: IWaypoint[];
}
