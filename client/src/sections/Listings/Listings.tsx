import React from 'react';
import {server} from '../../lib/api'



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

interface Props{
    title: string;
    owner: string;
}



// destructured the props and typeDefined them using the interface's name. then passed them to the component.
export const Listings = ({title,owner}:Props) => {

    const fetchListings = async() => {
        // reponse was volumous, {data} is the only thing we need so we desctructured the response and took only data part.
        const {data } =await server.fetch({query: LISTINGS});
        console.log(data);
    };

    return( 
    <div>
        <h2>{title} Listings Owned by {owner}</h2>
        <button onClick={fetchListings}>Console Log Listings from MongoDB</button>

    </div>
    )
};
