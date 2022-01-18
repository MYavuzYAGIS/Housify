import React from 'react';
import {server} from '../../lib/api'
import { DeleteListingData, DeleteListingVariables,ListingsData } from './types';



// this makes actual graphql request to the server as query. So this const is going to be sent to server and server expects this format.
// what is expected is a promise, and we made a listings const to store the awaited response.
// then console.logged the response.
//EZ
const LISTINGS = `
    query Listings { 
        listings { 
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            numOfBaths
            rating
        }
    }

`;

const DELETE_LISTING = `
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

interface Props{
    title: string;
    owner: string;
}



// destructured the props and typeDefined them using the interface's name. then passed them to the component.
export const Listings = ({title,owner}:Props) => {

    const fetchListings = async() => {
        // reponse was volumous, {data} is the only thing we need so we desctructured the response and took only data part.
        const {data } =await server.fetch<ListingsData>({query: LISTINGS});
        // defined type through interface, so data.listings is ok but data.asdasda is given error since there is no asdsad in the interface.
        console.log(data.listings);
    };


    const deleteListings = async() => {
        const {data} = await server.fetch<DeleteListingData,DeleteListingVariables>({
            query: DELETE_LISTING,
            variables:{id: '61e5751bb872def982770012'} });
            console.log(data);
    };
           

 


    return( 
    <div>
        <h2>{title} Listings Owned by {owner}</h2>
        <button onClick={fetchListings}>Console Log Listings from MongoDB</button>
        <button onClick={deleteListings}>Mutate listings from MongoDB</button>

    </div>
    )
};
