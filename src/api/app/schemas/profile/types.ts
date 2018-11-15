import { IItinerary } from '../itinerary/types';
import { DocumentWithDelete } from '../../../types';

export interface IProfile {
  id: string;
  name: string;
  description?: string;
  itineraries?: IItinerary[];
}

/* TODO:
export interface IProfileInternal extends IProfile {
  users: IUser[];
}*/

export type IProfileModel = IProfile & DocumentWithDelete;

export type IProfileInput = Pick<IProfile, "name" | "description">;

export interface IQueryArgs {
  id: string;
}

export interface ICreateArgs {
  input: IProfileInput;
}

export interface IUpdateArgs {
  id: string;
  input: IProfileInput;
}