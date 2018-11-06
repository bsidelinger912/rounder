const { makeExecutableSchema } = require('graphql-tools');

const profileResolvers = require('./profile/resolvers');
const Profile = require('./profile/schema');

const SchemaDefinition = `
type Query {
  allProfiles: [Profile]
  getProfile(id: ID!): Profile
  getUser(id: ID!): User
}

type Mutation {
  createProfile(input: ProFileInput) : Profile
  updateProfile(id: ID!, input: ProFileInput): Profile
  deleteProfile(id: ID!): Profile
}
`;

const userResolvers = require('./user/resolvers');
const User = require('./user/schema');

const resolvers = [profileResolvers, userResolvers];
const typeDefs = [SchemaDefinition, Profile, User];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
