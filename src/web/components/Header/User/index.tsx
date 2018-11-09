/**
 * @class User
 * @description
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { IUser } from 'src/api/app/schemas/user/types';
import UserHeaderContent from './UserHeaderContent';

interface Data {
  user: Partial<IUser>;
}

// TODO: get this id on the server!
const fragment = `
  {
    user(id: "5bdbe0e075d95e8db4a80bfb") {
      email
    }
  }
`;

class UserQuery extends Query<Data>{}

export const User: React.SFC<any> = ({ user: { loggedIn } }) => {
  if (!loggedIn) {
    return null;
  }

  return (
    <UserQuery
      query={gql(fragment)}
    >
      {({ loading, error, data }) => {
        if(loading) return null;
        if(error || !data || !data.user) return null;

        return <UserHeaderContent {...data} />
      }}
    </UserQuery>
  );
    
};

// TODO: type the redux store **** 
function mapStateToProps({ user }: any) {
  return { user };
}

export default connect(mapStateToProps)(User)
