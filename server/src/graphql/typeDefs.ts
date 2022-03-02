import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings: Bookings
    listings: Listings!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  input LogInInput {
    code: String!
  }

  type Query {
    authUrl: String!
    user: String!
  }

  type Mutation {
    logIn(login: LogInInput): Viewer!
    logOut: Viewer!
  }
`;
