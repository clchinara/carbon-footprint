import { useState } from 'react';

const useCustomPoster = () => {
  const [result, setResult] = useState({ loading: true, returnData: {} });

  const postFetcher = ({ resourceURL = {}, params = {}, contentType = `application/json` }) => {
    const headers = {
      'Content-Type': contentType,
      'Authorization': `Key ${process.env.REACT_APP_CLARIFAI_APIKEY}` 
    };

    fetch(resourceURL, { method: 'POST', headers, body: params })
      .then(res => res.json())
      .then(
        (result) => {
          setResult({ loading: false, returnData: result });
        }
      ).catch(err => {
        console.error(err);
      });
  };

  return { postFetcher, result };
};

export const usePostPrediction = () => {
  const { result, postFetcher } = useCustomPoster();
  const { loading, returnData } = result;
  let isSuccess = false;
  let isError = false;
  let messageError = '';
  let output = [];
  let imgUrl = '';

  const postPrediction = param => {
    const resourceURL = new URL(`https://api.clarifai.com/v2/models/${process.env.REACT_APP_CLARIFAI_MODEL_ID}/versions/${process.env.REACT_APP_CLARIFAI_VERSION_ID}/outputs`);
    const bodyParam = {
      inputs:[
        {
          data: {
            image: {
              url: param.image
            }
          }
        }  
      ]
    };

    postFetcher({ resourceURL, params: JSON.stringify(bodyParam) });
  };

  if (!loading) {
    if (!returnData?.status?.code) {
      isError = !returnData?.success;
      messageError = "An error has occured";
    } else {
      isSuccess = returnData?.status?.code === 10000;
      output = returnData?.outputs[0]?.data?.concepts;
      imgUrl = returnData?.outputs[0]?.input?.data?.image?.url;
    }
  }

  return {
    prediction: { result: output, image: imgUrl },
    loading,
    isSuccess,
    isError,
    messageError,
    postPrediction,
  };
};
