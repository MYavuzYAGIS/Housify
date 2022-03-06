import { IResolvers } from "@graphql-tools/utils";
import { UserArgs,UserBookingArgs,UserBookingsData } from "./types";
import { authorize } from "../../../lib/utils";
import {Database,User} from "../../../lib/types";
import {Request } from "express";

export const userResolvers:IResolvers={
    Query:{
        user: async (_root:undefined, {id}:UserArgs, {db,req}:{db:Database, req:Request}) : Promise<User> =>{
            try {
                const user = await db.users.findOne({_id:id});
                if(!user){
                    throw new Error("User not found");
                }
                const viewer = await authorize(db,req);
                if (viewer && viewer._id === user._id) {
                    user.authorized = true;
                }
                return user;
                
            } catch (error) {
                throw new Error(`Failed to get user: ${error}`);
            }
                
            }
        },
        User:{
            id: (user:User):string => user._id,
            hasWallet: (user:User):boolean => Boolean(user.walletId),
            income: (user:User): number | null => { return user.authorized?user.income:null},
            bookings:async (user:User,{limit,page}:UserBookingArgs,{db}: {db:Database}) : Promise<UserBookingsData | null> =>{
                try{
                    if (!user.authorized){

                    }
                    const data:UserBookingsData = {
                        total:0,
                        result:[]

                    }
                    let cursor = await db.bookings.find({
                        _id :{$in:user.bookings}
                    });
                    cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                    cursor = cursor.limit(limit);
                    data.total = await cursor.count();
                    data.result = await cursor.toArray();
                    return data;

                }
                catch(error){
                    throw new Error(`Failed to query user bookings: ${error}`);
                }


            }
            listings:
        }
    }

