import { IResolvers } from "@graphql-tools/utils";
// OAuth login/logout view resolvers
export const ViewerResolvers: IResolvers = {
    Query: {
        authUrl: () => {
            return "Query.authUrl";
        }
    },
    Mutation: {
        logIn: () => {return "Mutation.logIn";},
        logOut: () => {return "Mutation.logOut";}
    }
}