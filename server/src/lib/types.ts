import { Collection, ObjectId } from "mongodb";


export interface Listing {
    _id: ObjectId; // prefixed for mongodb unique id.

}

export interface Booking{
    _id: ObjectId;
}


export interface User {
    _id: ObjectId;
    // username: string;
    // password: string;
    // email: string;

}


export interface Database{
    listings: Collection<Listing>;
    users: Collection<User>;
    bookings: Collection<Booking>;
}