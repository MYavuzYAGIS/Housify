import { ObjectId } from 'mongodb';
import { IResolvers } from "@graphql-tools/utils";
import { Database, Listing } from '../lib/types';




// const resolvers:IResolvers 
export const resolvers:IResolvers= {
    Query: {
    // I dont need to pass the root and args, {db} is the context argument, desctructured. {db:Database} is the typescript type which I imported from lib/types.ts
        listings: async (_root: undefined, _args:Record<string, never>, {db}:{db:Database}) => {
            return await db.listings.find({}).toArray();
        }
    },
    Mutation: {
        deleteListing: async (_root: undefined, {id}:{id:string},{db}:{db:Database}) => {
            const deleteRes =await db.listings.findOneAndDelete({_id: new ObjectId(id)});
        
        if(! deleteRes.value){
            throw new Error('delete failed');1
        }
        return deleteRes.value;
        }
    },
    Listing:{
        title:(listing:Listing)=> listing.title,
        image:(listing:Listing)=> listing.image,
        address:(listing:Listing)=> listing.address,
        price:(listing:Listing)=> listing.price,
        numOfGuests:(listing:Listing)=> listing.numOfGuests,
        numOfBeds:(listing:Listing)=> listing.numOfBeds,
        numOfBaths:(listing:Listing)=> listing.numOfBaths,
        rating:(listing:Listing)=> listing.rating
    }
} 