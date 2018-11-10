import * as React from 'react';

import Profile from "src/web/pages/Profile/ProfileContent";
import { IProfile } from 'src/api/app/schemas/profile/types';

const styles = require('./singleProfile.scss');

// TODO: get this interface frome somewhere???
interface Profile {
  name: string;
  description: string;
}

interface Props {
  profile: IProfile
}

const SingleProfileDashboard: React.SFC<Props> = ({ profile }) => {
  return (
    <div className={styles.main}>
      <Profile {...profile} />
    </div>
  )
};

export default SingleProfileDashboard;