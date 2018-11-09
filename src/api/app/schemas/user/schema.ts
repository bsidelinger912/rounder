import Profile from '../profile/schema';

const User = `
type User {
  id: ID!
  email: String!
  profiles: [Profile]
}
`;

export default () => [User, Profile];
