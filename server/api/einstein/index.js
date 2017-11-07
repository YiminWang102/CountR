const router = require('express').Router();
const request = require('request');

const url = "https://api.einstein.ai/v2/vision/predict";



router.get('/', (req, res, next) => {
  console.log('get request to api/einstein/');
  res.send('hello');
});

router.post('/', (req, res, next) => {
  console.log('post request to api/einstein');
  const imageURL = req.body.imageURL;

  const headers = {
    "Authorization": "Bearer AEIDVOJCULPDA3U2IOERTBHQVSNBPZBTC46PT6PQFPQU3GSMA66G3ZQ7K6GJDOCZHFJX5KS3TYBW7KL22RY35TDNUJEMZQ4J55XZS5A",
    "Cache-Control": "no-cache",
    "Content-Type": "multipart/form-data"
  };

  const formData = {
    "sampleLocation":imageURL,
    "modelId":"FoodImageClassifier"
  };
  const thisRes = res;
  request.post({url, headers, formData}, (err, res, body) => {
    //console.log(err);
    console.log(res.body);
    thisRes.send(res.body);
    //console.log(body);
  });

});

module.exports = router;
