const Profile = `
extend type Query {
  profiles: [Profile]
  profile(id: ID!): Profile
}

extend type Mutation {
  createProfile(input: ProFileInput) : Profile
  updateProfile(id: ID!, input: ProFileInput): Profile
  deleteProfile(id: ID!): Profile
  restoreProfile(id: ID!): Profile
  disconnectFromProfile(id: ID!): Profile
  reconnectToProfile(id: ID!): Profile
}

type Profile {
  id: ID!
  name: String!
  description: String
  itineraries: [Itinerary]
}

input ProFileInput {
  name: String!
  description: String
}
`;

export default () => [Profile];
