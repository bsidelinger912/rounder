/**
 * @class ProfileItem
 * @description 
 */

import * as React from 'react';

import { IProfile } from 'src/api/app/schemas/profile/types';
import DeleteProfileButton from 'src/web/components/DeleteProfileButton';

export interface Props extends IProfile {
}

const ProfileItem: React.SFC<Props> = ({ name, description, id }) => {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Description: {description}</div>

      <DeleteProfileButton id={id} />
    </div>
  );
};

export default ProfileItem;
