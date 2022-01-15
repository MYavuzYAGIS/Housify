import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
    } from 'graphql'

import {listings} from './listings'

//Creatinng a custom data type
const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
        // ID takes speacial type : GraphQLID which is serialized as string. We wrapped types with GraphQLNonNull so that we can't get null values.
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      image: { type: new GraphQLNonNull(GraphQLString) },
      address: { type: new GraphQLNonNull(GraphQLString) },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      numOfGuests: { type: new GraphQLNonNull(GraphQLInt) },
      numOfBeds: { type: new GraphQLNonNull(GraphQLInt) },
      numOfBaths: { type: new GraphQLNonNull(GraphQLInt) },
      rating: { type: new GraphQLNonNull(GraphQLInt) },
    },
  });

// define query type 
const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        listings:{
            type: new GraphQLNonNull (new GraphQLList(new GraphQLNonNull(Listing))),
            resolve: () => listings
        }
    }
});

// define mutation type
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        deleteListing:{
            type: new GraphQLNonNull(Listing),
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (_root,{id}) => {
                for(let i=0; i<listings.length; i++){
                    if(listings[i].id === id){
                        return listings.splice(i,1)[0];
                    }
                }
            throw new Error('failed to delete listing.')
            }
        }
    }
});

export const schema = new GraphQLSchema({query,mutation});