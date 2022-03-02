import React, {useState, useEffect,useRef} from 'react';
// import ApolloClient from 'apollo-boost';
import {render} from 'react-dom';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {Home,Host,Listing,User,Login,NotFound,Listings,AppHeader} from './sections';
import {ApolloProvider, useMutation} from '@apollo/client'
import './styles/index.css';
import {Affix,Layout} from 'antd';
import {Viewer} from './lib/types'
import { LOG_IN } from './lib/graphql/mutations';
import { LogIn as LogInData, LogInVariables } from './lib/graphql/mutations/LogIn/__generated__/LogIn';

const ApolloBoost = require("apollo-boost")
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient({
  uri: '/api', // <-- add the URL of the GraphQL server here
});





const initialViewer:Viewer = {
  id:null,
  token:null,
  avatar:null,
  hasWallet:null,
  didRequest:false
}



const App = () => {
  const [viewer,setViewer] = useState<Viewer>(initialViewer)
  const [logIn,{error}]= useMutation<LogInData,LogInVariables>(LOG_IN,{
    onCompleted:data =>{
      if (data && data.logIn){
        setViewer(data.logIn);
    }
  }
});
  const logInRef = useRef(logIn);
  useEffect(()=>{
    logInRef.current();
  },[])




  

  console.log(viewer)
  return(
    <Router>
      <Layout id="app">
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer}  />
        </Affix>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/host" element={<Host/>} />
        <Route path="/listing/:id" element={<Listing/>} />
        <Route path="/listings/:location" element={<Listings/>} />
        <Route path="/user/:id" element={<User/>} />
        {/* <Route path="/login" element={(Props) => (<Login {...Props} setViewer={setViewer} />)} /> */}
        <Route path="/login" element={<Login setViewer={setViewer} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Layout>
    </Router>
  )

}
render(
  <ApolloProvider client ={client} >
    <App />
  </ApolloProvider>
  ,document.getElementById('root')

);
