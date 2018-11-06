const Profile = require('../profile/schema');

const User = `
type User {
  id: ID!
  email: String!
  profiles: [Profile]
}
`;

module.exports = () => [User, Profile];
