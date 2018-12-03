const Itinerary = `
extend type Query {
  itineraries: [Itinerary]
  itinerary(id: ID!): Itinerary
}

extend type Mutation {
  createItinerary(input: ItineraryInput!, profileId: ID!) : Itinerary
  updateItinerary(id: ID!, input: ItineraryInput): Itinerary
  deleteItinerary(id: ID!): Itinerary
  restoreItinerary(id: ID!): Itinerary
}

type Itinerary {
  id: ID!
  name: String!
  description: String
}

input ItineraryInput {
  name: String!
  description: String
}
`;

export default () => [Itinerary];
