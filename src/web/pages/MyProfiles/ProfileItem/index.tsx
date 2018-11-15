/**
 * @class ProfileItem
 * @description 
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

import { IProfile } from 'src/api/app/schemas/profile/types';
import DeleteProfileButton from 'src/web/components/DeleteProfileButton';

const styles = require('./profileItem.scss');

export interface Props extends IProfile {
}

const ProfileItem: React.SFC<Props> = ({ name, description, id }) => {
  return (
    <Link to={`/profiles/${id}`} className={styles.wrapper}>
      <div className={styles.main}>
        <h4 className={styles.profileName}>{name}</h4>
        <p className={styles.profileDescription}>{description}</p>
      </div>
      <div className={styles.buttons}>
        <DeleteProfileButton id={id} />
      </div>
    </Link>
  );
};

export default ProfileItem;
