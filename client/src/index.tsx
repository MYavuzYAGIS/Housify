import React from 'react';
// import ApolloClient from 'apollo-boost';
import {render} from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Listings} from './sections';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
