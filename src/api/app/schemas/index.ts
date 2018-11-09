import { makeExecutableSchema } from 'graphql-tools';

import profileResolvers from './profile/resolvers';
import ProfileSchema from './profile/schema';

import userResolvers from './user/resolvers';
import UserSchema from './user/schema';

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

// TODO: figure out why need to cast userResolvers to any????
const resolvers = [profileResolvers, userResolvers as any];
const typeDefs = [SchemaDefinition, ProfileSchema, UserSchema];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
