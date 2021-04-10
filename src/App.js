/* global chrome */
/* eslint-disable no-undef */


import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
      const queryInfo = {active: true, lastFocusedWindow: true};

      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          const url = tabs[0].url;
          setUrl(url);
      });
  }, []);

  chrome.runtime.onMessage.addListener((request, sender) => {
      setImgUrl(request.message);
      console.log('React imgUrl', imgUrl);
  })

  return (
      <div className="App">
          <div className="container">
                <div className="title"><strong>Carbon footprint</strong></div>
                <div className="data">190kgCO2</div>
          </div>
      </div>
  );
};
export default App;
