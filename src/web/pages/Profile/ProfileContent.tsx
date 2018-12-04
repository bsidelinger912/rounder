/**
 * @class ProfileContent
 * @description 
 */

import * as React from 'react';

import { IProfile } from 'src/api/app/schemas/profile/types';
import ItineraryList from './ItineraryList';
import EditProfile from './EditProfile';
import InteractiveTooltip from 'src/web/components/InteractiveTooltip';
import NewProfileButton from 'src/web/components/NewProfileButton';

const styles = require('./profile.scss');

export interface Props extends IProfile {
}

const ProfileContent: React.SFC<Props> = (props) => {
  const { name, itineraries, id } = props;

  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.profileContent}>
          <InteractiveTooltip direction="down-start" headingContent="Edit Profile" mainContent={<EditProfile profile={props} />}>
            <h3 className={styles.profileName}>{name}</h3>
          </InteractiveTooltip>

          <NewProfileButton />
        </div>
      </div>

      <div className={styles.itinerariesHeading}>
        <div>
          <h4>Upcoming Itineraries</h4>
        </div>
      </div>

      <div className={styles.itineraries}>
        <ItineraryList profileId={id} itineraries={itineraries || []} />
      </div>
    </div>
  );
};

export default ProfileContent;