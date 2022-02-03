import { Collection, ObjectId } from "mongodb";


export interface Viewer { 
    _id?: string;
    token?: string;
    avatar?: string;
    walletId?: string;
    didRequest: boolean;
  
}
export enum ListingType {
    Apartment = "APARTMENT",
    House = "HOUSE",
}
export interface BookingsIndexYear{
    [key: string]: BookingsIndexMonth;
}
export interface BookingsIndexMonth{
    [key: string]: boolean;
}
export interface BookingsIndex{
    [key: string]: BookingsIndexYear;
}
export interface Listing {
    _id: ObjectId; // prefixed for mongodb unique id.
    title: string;
    description: string;
    image: string; // image url
    host: string; // user id. one to one relationship with user _id.
    type: ListingType;  // enum type. one to 2 relationship with ListingType.
    address: string;
    country: string;
    admin: string; // state or province
    city: string;
    bookings: ObjectId[]; // array of booking ids. one to many relationship with booking _id.
    bookingsIndex: BookingsIndex; // index of bookings for time search.
    price: number;
    numOfGuests: number;
}
export interface Booking{
    _id: ObjectId;
    listing: ObjectId; // one to one relationship with listing _id.
    tenant: string; // user id. one to one relationship with user _id. type is string because user _id is string
    checkIn: string;
    checkOut: string;
}


// export interface User {
    // _id: string;  // I will use a 3rd party library to authenticate which returns a string. so I need  to modify this.
    // token:string; // user auth token
    // name: string;
    // avatar: string; // data is img url
    // contact: string;
    // walletId?: string; // stripe customer id. string or undefined. if undefined, user has not connected his wallet so cannot receive any money.
    // income: number; // user's total income.
    // bookings: ObjectId[]; // array of booking id. one to many relationship. takes from booking collection.
    // listings: ObjectId[]; // array of listing id. one to many relationship. takes from listing collection.
    export interface User {
        _id: string;
        token: string;
        name: string;
        avatar: string;
        contact: string;
        walletId?: string;
        income: number;
        bookings: ObjectId[];
        listings: ObjectId[];
      
}


export interface Database{
    listings: Collection<Listing>;
    users: Collection<User>;
    bookings: Collection<Booking>;
}