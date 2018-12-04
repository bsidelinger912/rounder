import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

import { IProfile } from 'src/api/app/schemas/profile/types';
import ProfileContent from './ProfileContent';

interface QueryProps {
  profileId: string;
}

interface Props extends RouteComponentProps<QueryProps> {}

interface Data {
  profile: IProfile;
}

class ProfileQuery extends Query<Data, QueryProps>{}

const Profile = gql`
  query Profile($profileId: ID!) {
    profile(id: $profileId) {
      id
      name
      description
      itineraries {
        name
        description
      }
    }
  }
`;

const WithQuery: React.SFC<Props> = (props) => {
  const profileId = props.match.params.profileId;

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