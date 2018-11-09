import * as React from 'react';

import { Profile } from "src/web/pages/Profile";

const styles = require('./singleProfile.scss');

// TODO: get this interface frome somewhere???
interface Profile {
  name: string;
  description: string;
}

interface Props {
  profile: Profile
}

const SingleProfileDashboard: React.SFC<Props> = ({ profile }) => {
  return (
    <div className={styles.main}>
      <h2>SingleProfileDashboard</h2>
      <Profile {...profile} />
    </div>
  )
};

export default SingleProfileDashboard;