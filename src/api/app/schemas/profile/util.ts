import { IUserModel } from '../user/types';
import { IProfileModel } from './types';

export function userCanModifyProfile(user: IUserModel, profile: IProfileModel): boolean {
  // for now any user that can act on a profile will be in the users array (even ones who've disconnected from the profile)
  return !!(profile.users.find(user => user.id === user.id));
}

export async function addProfileToUser(user: IUserModel, profile: IProfileModel): Promise<void> {
  if (!user.profiles) {
    user.profiles = [];
  }

  // save it to the user
  user.profiles.push(profile);
  await user.save();
}

export async function removeProfileFromUser(user: IUserModel, profile: IProfileModel): Promise<void> {
  if (!user.profiles) {
    return;
  }

  const profileIndex = user.profiles.findIndex(curProfile => profile.id === curProfile.id);
  profileIndex > -1 && user.profiles.splice(profileIndex, 1);

  await user.save();
}