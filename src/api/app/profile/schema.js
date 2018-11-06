const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
type Profile {
  id: ID!
  name: String!
  description: String
}

type Query {
  allProfiles: [Profile]
  getProfile(id: ID!): Profile
}

input ProFileInput {
  name: String!
  description: String
}

type Mutation {
  createProfile(input: ProFileInput) : Profile
  updateProfile(id: ID!, input: ProFileInput): Profile
  deleteProfile(id: ID!): Profile
}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
