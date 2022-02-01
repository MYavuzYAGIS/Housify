import React from 'react';
// import ApolloClient from 'apollo-boost';
import {render} from 'react-dom';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {Home,Host,Listing,User,NotFound,Listings} from './sections';
import {ApolloProvider} from '@apollo/client'
import './styles/index.css';

const ApolloBoost = require("apollo-boost")
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient({
  uri: '/api', // <-- add the URL of the GraphQL server here
});


const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/host" element={<Host/>} />
        <Route path="/listing/:id" element={<Listing/>} />
        <Route path="/listings/:location" element={<Listings/>} />
        <Route path="/user/:id" element={<User/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )

}
render(
  <ApolloProvider client ={client} >
    <App />
  </ApolloProvider>
  ,document.getElementById('root')

);
