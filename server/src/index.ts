//imports
import {ApolloServer} from 'apollo-server-express';
import express from "express";



//constants
const app = express();
const port = process.env.PORT || 9000;
//topware-middlewares

const server = new ApolloServer();
server.applyMiddleware({app, path:'/api'});
// list listings route







// app listens
app.listen(port);
