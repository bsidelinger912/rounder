import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { IProfile } from 'src/api/app/schemas/profile/types';
import ProfileContent from './ProfileContent';

interface QueryProps {
  profileId: string;
}

interface Data {
  profile: IProfile;
}

class ProfileQuery extends Query<Data, { profileId: string; }>{}

const Profile = gql`
  query Profile($profileId: ID!) {
    profile(id: $profileId) {
      name
      description
    }
  }
`;

const WithQuery: React.SFC<QueryProps> = ({ profileId }) => {
  return (
    <ProfileQuery
      query={Profile}
      variables={{ profileId }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error || !data) return <p>Error :(</p>;

        return (
          <ProfileContent {...data.profile} />
        );
      }}
    </ProfileQuery>
  );
}

export default WithQuery;