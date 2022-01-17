// seed the MongoDB  with mock data for testing.

require('dotenv').config();
import { connectDatabase } from "../src/database";
import { Listing } from "../src/lib/types";
import { ObjectId } from "mongodb";
import { exit } from "process";

const seed = async ()=> {
    try{
        console.log('[seed] starting...');
        const db = await connectDatabase();
        const listings:Listing[] = [
            {
            _id: new ObjectId(),
            title:
                "Clean and fully furnished apartment. 5 min away from CN Tower",
            image:
                "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
            address: "3210 Scotchmere Dr W, Toronto, ON, CA",
            price: 10000,
            numOfGuests: 2,
            numOfBeds: 1,
            numOfBaths: 2,
            rating: 5
            },
            {
            _id: new ObjectId(),
            title: "Luxurious home with private pool",
            image:
                "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
            address:
                "100 Hollywood Hills Dr, Los Angeles, California",
            price: 15000,
            numOfGuests: 2,
            numOfBeds: 1,
            numOfBaths: 1,
            rating: 4
            },
            {
            _id: new ObjectId(),
            title:
                "Single bedroom located in the heart of downtown San Fransisco",
            image:
                "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
            address: "200 Sunnyside Rd, San Fransisco, California",
            price: 25000,
            numOfGuests: 3,
            numOfBeds: 2,
            numOfBaths: 2,
            rating: 3
            },
            {
            _id: new ObjectId(),
            title:
                "3+1 , bakimli, kombili, toplu ulasima yakin.",
            image:
                "https://www.magazinburada.net/images/haberler/2020/05/sahibinden_satilik_ev_ilani_verenlere_buyuk_para_cezasi_geliyor_h6860_ae1f9.jpg",
            address: "Gungoren Mahallesi, Haci bektas cikmazi, Istanbul",
            price: 250012120,
            numOfGuests: 3,
            numOfBeds: 2,
            numOfBaths: 2,
            rating: 1
            }
    ];

    for(const listing of listings){
        await db.listings.insertOne(listing);
    }
    console.log('[seed] success!');
    process.exit()


    }catch(e){
       throw new Error('[seed] error' + e);
    }
}

seed();