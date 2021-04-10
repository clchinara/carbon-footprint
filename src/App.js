/* global chrome */
/* eslint-disable no-undef */


import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { usePostPrediction } from './helpers/apiPost'

const App = () => {
  const [url, setUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const { loading, isSuccess, isError, messageError, postPrediction, prediction } = usePostPrediction()

  useEffect(() => {
      const queryInfo = {active: true, lastFocusedWindow: true};

      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          const url = tabs[0].url;
          setUrl(url);
      });
  }, []);

  useEffect(() => {
      if (isError) {
          console.log(messageError)
      }

      if (isSuccess) {
          console.log(prediction);
      }
  }, [prediction, isSuccess, isError, messageError])

  chrome.runtime.onMessage.addListener((request, sender) => {
      setImgUrl(request.message);
      const param = {
          image: request.message
      };

      postPrediction(param);
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
