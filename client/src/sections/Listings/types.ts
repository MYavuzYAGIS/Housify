interface Listing{
    id:string;
    title:string;
    image:string;
    address:string;
    price:number;
    numOfGuests:number;
    numOfBeds:number;
    numOfBaths:number;
    rating:number;

}

export interface ListingsData{
    // since returns an array of Listing, we can use the spread operator to make it more readable
    listings:Listing[];
}



export interface DeleteListingData{
    deleteListing:Listing;

}

export interface DeleteListingVariables{
    id:string;
}