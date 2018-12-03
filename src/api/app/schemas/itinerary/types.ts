import { IWaypoint } from '../waypoint/types';
import { DocumentWithDelete } from '../../../types';

export interface IItinerary {
  name: string;
  description?: string;
  waypoints?: IWaypoint[];
}

export type IItineraryModel = IItinerary & DocumentWithDelete;

export type IItineraryInput = Pick<IItinerary, "name" | "description">;

export interface IQueryArgs {
  id: string;
}

export interface ICreateArgs {
  input: IItineraryInput;
  profileId: string;
}

export interface IUpdateArgs {
  id: string;
  input: IItineraryInput;
}