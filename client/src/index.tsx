import React from 'react';
// import ApolloClient from 'apollo-boost';
import {render} from 'react-dom';
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import {Home,Host,Listing,User,NotFound,Listings} from './sections';
import {ApolloProvider} from '@apollo/client'
import './styles/index.css';

const ApolloBoost = require("apollo-boost")
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient({
  uri: '/api', // <-- add the URL of the GraphQL server here
});


render(
  <ApolloProvider client ={client} >
     <Listings title="Housify"  owner="Yavuz"/>
  </ApolloProvider>
  ,document.getElementById('root')

);
