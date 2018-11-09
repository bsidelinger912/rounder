import { Profile } from "../profile/types";

export interface User {
  _id: string;
  id: string;
  email: string;

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
  profiles?: [Profile];

  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

export interface QueryArgs {
  id: string;
}