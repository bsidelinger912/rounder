/**
 * @class MultiProfileDashboard
 * @description 
 */

import * as React from "react";

import { IProfile } from "src/api/app/schemas/profile/types";
import MyProfilesContent from 'src/web/pages/MyProfiles/MyProfilesContent';

export interface Props {
  profiles: IProfile[];
}

const MultiProfileDashboard: React.SFC<Props> = ({ profiles }) => {
  return (
    <div>
      <MyProfilesContent {...{ profiles }} />
    </div>
  );
};

export default MultiProfileDashboard;