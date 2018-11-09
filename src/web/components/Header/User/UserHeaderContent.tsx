/**
 * @class UserHeaderContent
 * @description 
 */

import * as React from "react";

import Tooltip from 'src/web/components/Tooltip';
import { Consumer } from 'src/web/Context';
import { IUser } from "src/api/app/schemas/user/types";
const styles = require('./user.scss');

export interface Props {
  user: Partial<IUser>
}

const UserHeaderContent: React.SFC<Props> = ({ user: { email } }) => {
  const firstLetter = email ? email.charAt(0).toUpperCase() : '';

  const tooltipContent = (
    <div>
      <div className={styles.tooltipHeading}>
        {email}
      </div>

      <Consumer>
        {({ authClient }) => authClient && (
          <button onClick={authClient.logout} className={styles.logout}>Logout</button>
        )}
      </Consumer>
    </div>
  );

  return (
    <div className={styles.main}>
      <Tooltip content={tooltipContent} className={styles.tooltip} eventToggle="onClick">
        <div className={styles.circle}>
          {firstLetter}
        </div>
      </Tooltip>
    </div>
  );
};

export default UserHeaderContent;