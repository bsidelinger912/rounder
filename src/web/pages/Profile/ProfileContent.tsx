/**
 * @class ProfileContent
 * @description 
 */

import * as React from 'react';

import { IProfile } from 'src/api/app/schemas/profile/types';
import PlusButton from 'src/web/components/PlusButton';
import ItineraryList from './ItineraryList';
import EditProfile from './EditProfile';
import InteractiveTooltip from 'src/web/components/InteractiveTooltip';

const styles = require('./profile.scss');

export interface Props extends IProfile {
}

const ProfileContent: React.SFC<Props> = (props) => {
  const { name, itineraries } = props;

  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.profileContent}>
          <InteractiveTooltip direction="down-start" headingContent="Edit Profile" mainContent={<EditProfile profile={props} />}>
            <h3 className={styles.profileName}>{name}</h3>
          </InteractiveTooltip>

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