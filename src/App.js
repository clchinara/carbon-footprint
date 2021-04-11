/* global chrome */
/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import './App.css';

const material = ['cotton', 'plastic', 'leather'];
const materialMap = {
    cotton: 0.15,
    plastic: 0.35,
    leather: 0.25,
};

const App = () => {
  const [carbonFootprint, setCarbonFootprint] = useState('0 kgCO2');
  const [coba, setCoba] =  useState('');

  chrome.runtime.onMessage.addListener((request) => {
    setCoba(request.message);
      const params = {
        inputs:[
          {
            data: {
              image: {
                url: request.message
              }
            }
          }  
        ]
      };

      const headers = {
        'Content-Type': `application/json` ,
        'Authorization': `Key ${process.env.REACT_APP_CLARIFAI_APIKEY}` 
      };  

      fetch(`https://api.clarifai.com/v2/models/${process.env.REACT_APP_CLARIFAI_MODEL_ID}/versions/${process.env.REACT_APP_CLARIFAI_VERSION_ID}/outputs`, { method: 'POST', headers, body: JSON.stringify(params) })
      .then(res => res.json())
      .then(
        (result) => {
            const prediction = result.outputs[0]?.data?.concepts;
            let res = prediction.filter(pred => material.includes(pred.name))
            if (res.length > 0) {
                const lastDigitStr = res[0].value.toString().split('.');
                const lastDigit = parseInt(lastDigitStr[1]) % 100;
                const count = Math.round((lastDigit * materialMap[res[0].name]) * 100) / 100;
                const result = count < 5 ? count + 10 : count;
                setCarbonFootprint(`${result} kgCO2`)
            } else {
                const lastDigitStr = prediction[0].value.toString().split('.');
                const lastDigit = parseInt(lastDigitStr[1]) % 100;
                const count = Math.round((lastDigit * 0.4) * 100) / 100
                const result = count < 5 ? count + 10 : count;
                setCarbonFootprint(`${result} kgCO2`)
            }
        }
      ).catch(err => {
        console.error(err);
      });
  });

  return (
     <div className="App">
        <div className="container">
              <div className="title"><strong>Carbon footprint</strong></div>
              <div className="data">{carbonFootprint}</div>
        </div>
      </div>
  );
};
export default App;
