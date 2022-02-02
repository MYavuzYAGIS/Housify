require('dotenv').config();
import { connectDatabase } from "../src/database";



const clear = async ()=> {
    try{
        console.log('[deletion] starting...');
        const db = await connectDatabase();

        const bookings = await db.bookings.find({}).toArray();
        const listings = await db.listings.find({}).toArray();
        const users = await db.users.find({}).toArray();

        bookings.length>0?await db.bookings.drop():console.log('no bookings to delete');
        listings.length>0?await db.listings.drop():console.log('no listings to delete');
        users.length>0?await db.users.drop():console.log('no users to delete');
        

    console.log('[deletion] success!');
    process.exit()


    }catch(e){
       throw new Error('[deletion] error' + e);
    }
}

clear();