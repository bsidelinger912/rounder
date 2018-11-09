export interface Profile {
  id: string;
  name: string;
  description?: string;
}

export type ProfileInput = Pick<Profile, "name" | "description">;

export interface QueryArgs {
  id: string;
}

export interface CreateArgs {
  input: ProfileInput;
}

export interface UpdateArgs {
  id: string;
  input: ProfileInput;
}