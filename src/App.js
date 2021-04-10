/* global chrome */
/* eslint-disable no-undef */


import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  /**
   * Get current URL
   */
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
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <p>Carbon footprint:</p>
              <p>
                  {url}
              </p>
          </header>
      </div>
  );
};
export default App;
