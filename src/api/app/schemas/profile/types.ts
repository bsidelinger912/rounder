import { IItinerary } from '../itinerary/types';
import { DocumentWithDelete } from '../../../types';
import { IUserModel } from '../user/types';

export interface IProfile {
  id: string;
  name: string;
  description?: string;
  itineraries?: IItinerary[];
}

export interface IProfileInternal extends IProfile {
  users: IUserModel[];
  pastUsers: IUserModel[];
}

export type IProfileModel = IProfileInternal & DocumentWithDelete;

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