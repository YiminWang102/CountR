const request = require('request');

const url = "https://api.einstein.ai/v2/vision/predict";

const headers = {
  "Authorization": "Bearer YEPC2YCYJ65LQATN2IKQBXJK42PSO4X4M5DLTCVXQ4IO7PBNHU7CIGSFMZJEEDCB2IDGITO6XAX7EUAIVPZCIAY2UDPCYK5FXTKHKCA",
  "Cache-Control": "no-cache",
  "Content-Type": "multipart/form-data"
};

const formData = {
  "sampleLocation":"https://media.istockphoto.com/photos/orange-fruit-isolated-on-white-picture-id477836156",
  "modelId":"FoodImageClassifier"
};

request.post({url, headers, formData}, (err, res, body) => {
  //console.log(err);
  console.log(res.body);
  //console.log(body);
});

/*
curl -X POST -H "Authorization: Bearer
QMJ7B7D64RIQ7YL673LZTRLWOGBEA4N4FAQNJSLX7DH5O3ULE6U7VH7KMKBVZBCICUUIWF5LHJADILSRSWHMI2ZU7XVJOTRF5IZHGXQ"
-H "Cache-Control: no-cache"
-H "Content-Type: multipart/form-data"
-F "sampleLocation=https://media.istockphoto.com/photos/orange-fruit-isolated-on-white-picture-id477836156"
-F "modelId=FoodImageClassifier" https://api.einstein.ai/v2/vision/predict

*/
