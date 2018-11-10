/**
 * @class ProfileContent
 * @description 
 */

import * as React from 'react';
import { IProfile } from 'src/api/app/schemas/profile/types';
import PlusButton from 'src/web/components/PlusButton';
import ItineraryList from './ItineraryList';

const styles = require('./profile.scss');

export interface Props extends IProfile {
}

const ProfileContent: React.SFC<Props> = ({ name, itineraries }) => {
  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.profileContent}>
          <h3 className={styles.profileName}>{name}</h3>
          <PlusButton tooltipContents="Add a new Profile" />
        </div>
      </div>
      <div className={styles.itineraries}>
        <ItineraryList itineraries={itineraries || []} />
      </div>
    </div>
  );
};

export default ProfileContent;