import { Collection, ObjectId } from "mongodb";


export interface Listing {
    _id: ObjectId; // prefixed for mongodb unique id.
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;   
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
}