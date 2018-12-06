import { IUserModel } from '../user/types';
import { IProfileModel } from './types';

export function userCanModifyProfile(user: IUserModel, profile: IProfileModel): boolean {
  // for now any user that can act on a profile will be in the users array (even ones who've disconnected from the profile)
  return !!(profile.admins.find(thisUser => thisUser.id === user.id));
}

export function userCanConnectToProfile(user: IUserModel, profile: IProfileModel): boolean {
  // TODO: accept other relationships than admin in the future
  return !!(profile.admins.find(thisUser => thisUser.id === user.id));
}

export async function addUserToProfile(user: IUserModel, profile: IProfileModel): Promise<void> {
  if (!profile.admins) {
    profile.admins = [];
  }

  profile.admins.push(user);
  await profile.save();
}

export async function removeUserFromProfile(user: IUserModel, profile: IProfileModel): Promise<void> {
  // TODO: add logic for other relationship types
  if (!profile.admins) {
    return;
  }

  const adminIndex = profile.admins.findIndex(admin => admin.id === user.id);
  adminIndex > -1 && profile.admins.splice(adminIndex, 1);

  await profile.save();
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