
// MANUAL TYPE DEFINITIONS BEFORE INTRODUCING OAUTH
// import { gql } from "apollo-server-express";
// export const typeDefs = gql`
//     type Listing {
//         id: ID!
//         title: String!
//         image: String!
//         address: String!
//         price: Int!
//         numOfGuests: Int!
//         numOfBeds: Int!
//         numOfBaths: Int!
//         rating:Int!
//     }
//     type Query{
//         listings:[Listing!]!
//     }
//     type Mutation{
//         deleteListing(id:ID!): Listing!
//     }
// `;

// NEW TYPE DEFINITIONS AFTER INTRODUCING OAUTH

import { gql } from "apollo-server-express";
export const typeDefs = gql`
    type Query{
        authUrl: String! 
    }
    type Mutation{
        logIn: String!
        logOut: String!
    }
`;