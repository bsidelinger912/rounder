import { makeExecutableSchema } from 'graphql-tools';

import profileResolvers from './profile/resolvers';
import ProfileSchema from './profile/schema';

import userResolvers from './user/resolvers';
import UserSchema from './user/schema';

import itineraryResolvers from './itinerary/resolvers';
import ItinerarySchema from './itinerary/schema';

const SchemaDefinition = `
type Query {
  user(id: ID): User
}

type Mutation {
  _empty: String
}
`;

// TODO: figure out why need to cast userResolvers to any????
const resolvers = [profileResolvers, userResolvers as any, itineraryResolvers];
const typeDefs = [SchemaDefinition, ProfileSchema, UserSchema, ItinerarySchema];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
