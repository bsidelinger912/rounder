/**
 * @class ProfileItem
 * @description 
 */

import * as React from 'react';

import { IProfile } from 'src/api/app/schemas/profile/types';

export interface Props extends IProfile {
}

const ProfileItem: React.SFC<Props> = ({ name, description }) => {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Description: {description}</div>
    </div>
  );
};

export default ProfileItem;
