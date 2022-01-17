import { ObjectId } from 'mongodb';
import { IResolvers } from "@graphql-tools/utils";
import { Database, Listing } from '../lib/types';




// const resolvers:IResolvers 
export const resolvers:IResolvers= {
    Query: {
    // I dont need to pass the root and args, {db} is the context argument, desctructured. {db:Database} is the typescript type which I imported from lib/types.ts
        listings: async (_root: undefined, _args:Record<string, never>, {db}:{db:Database}): Promise<Listing[]> => {
            return await db.listings.find({}).toArray();
        }
    },
    Mutation: {
        deleteListing: async (_root: undefined, {id}:{id:string},{db}:{db:Database}): Promise<Listing> => {
            const deleteRes =await db.listings.findOneAndDelete({_id: new ObjectId(id)});
        
        if(! deleteRes.value){
            throw new Error('delete failed');1
        }
        return deleteRes.value;
        }
    },
    Listing:{
        /*
        define the resolvers for the Listing object just like did Query & Mutationfields. 
        Listing type was defined in lib/typedefs and the query is expecting to resolve it.
         hence, any field in the listing query is resolved to listing object of the Listing type. 
         from which you can reach the properties of the object using dot notation.
        */ 
        id: (listing:Listing):string => listing._id.toString(),
        // only the id is required to be returned becasuse it cannot be fetched from the database automatically
        // because it's type is ObjectId with precursor of _.
        // rest, what is down below are trivial and can be resolved by the resolvers automatically.

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