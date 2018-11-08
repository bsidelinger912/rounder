import * as React from 'react';

const styles = require('./profile.scss');

// TODO: get this interface frome somewhere???
interface Props {
  name: string;
  description: string;
}

const Profile: React.SFC<Props> = ({ name, description}) => {
  return (
    <div className={styles.main}>
      name: {name} <br />
      description: { description}
    </div>
  )
};

export default Profile;