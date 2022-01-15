import {GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql'


// define query type 
const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello:{
            type: GraphQLString,
            resolve: () => 'Hello world from the Query'
        }
    }

});



// define mutation type
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        hello:{
            type: GraphQLString,
            resolve: () => 'Hello world from the muatation'
        }
        
    }
});

export const schema = new GraphQLSchema({query,mutation});