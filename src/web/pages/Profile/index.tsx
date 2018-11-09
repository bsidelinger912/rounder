import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const styles = require('./profile.scss');

// TODO: get this interface frome somewhere???
interface Profile {
  name: string;
  description: string;
}

export const Profile: React.SFC<Profile> = ({ name, description}) => {
  return (
    <div className={styles.main}>
      name: {name} <br />
      description: { description}
    </div>
  )
};

interface QueryProps {
  profileId: string;
}

interface Data {
  getProfile: Profile;
}

class ProfileQuery extends Query<Data>{}

const WithQuery: React.SFC<QueryProps> = ({ profileId }) => {
  const fragment = `
    {
      getProfile(id: "${profileId}") {
        name
        description
      }
    }
  `;

  return (
    <ProfileQuery
      query={gql(fragment)}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error || !data) return <p>Error :(</p>;

        return (
          <Profile {...data.getProfile} />
        );
      }}
    </ProfileQuery>
  );
}

export default WithQuery;