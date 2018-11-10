import * as mongoose from "mongoose";

import { IProfile } from "../profile/types";

// this is the user object that gets sent to client
export interface IUser {
  id: string;
  email: string;
  profiles: IProfile[];
}

// the internal user object for how the db is set up
export interface IUserInternal {
  local?: {
    email: string;
    password: string;
  };
  facebook?: {
    id: string;
    token: string;
    email: string;
    name: string;
  };
  twitter?: {
    id: string;
    token: string;
    displayName: string;
    username: string;
  };
  google?: {
    id: string;
    token: string;
    email: string;
    name: string;
  };
}

export interface IUserModel extends IUserInternal, mongoose.Document {
  validPassword(password: string): boolean;
}

export interface IQueryArgs {
  id?: string;
}