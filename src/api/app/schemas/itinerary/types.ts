import { IWaypoint } from '../waypoint/types';
import { DocumentWithDelete } from '../../../types';
import { IProfile } from '../profile/types';

export interface IItinerary {
  id: string;
  name: string;
  description?: string;
  profile: IProfile;
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