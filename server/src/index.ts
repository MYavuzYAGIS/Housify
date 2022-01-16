//imports

require('dotenv').config();
import {ApolloServer} from 'apollo-server-express';
import express, {Application} from "express";
import {typeDefs, resolvers} from "./graphql";
import { connectDatabase } from './database';


//constants


const mount = async (app:Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({typeDefs,resolvers, context:() => ({db})});
server.start().then(()=>{
  server.applyMiddleware({app,path:'/api'});
  app.listen(process.env.PORT,()=>{console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
});
 // sanity Chechk 
  // const listings = await db.listings.find({}).toArray();
  // console.log(listings);
};


 mount(express());