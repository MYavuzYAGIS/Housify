import React from 'react';
import {render} from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {Listings} from './sections';

render(
 <Listings title="Housify"  owner="Yavuz"/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
