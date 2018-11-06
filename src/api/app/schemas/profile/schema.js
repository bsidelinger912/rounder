const Profile = `
type Profile {
  id: ID!
  name: String!
  userIds: [String]
  description: String
}

input ProFileInput {
  name: String!
  description: String
}
`;

module.exports = () => [Profile];
