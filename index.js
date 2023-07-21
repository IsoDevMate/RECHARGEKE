const africastalking = require('africastalking');
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');


app.use(cors());
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const port = process.env.PORT || 3000;

const credentials = {
  apiKey: process.env.API_KEY,
  username: process.env.USER_NAME,
};
//initializing the Africastalking service
const airtime = africastalking(credentials).AIRTIME;

console.log(credentials);

function sendAirtime(res) {

  const phone =req.body.phone;
  const amount = req.body.amount;

  const options = 
    {
      maxNumRetry: 3,
      recipients:[{phoneNumber: phone,amount:amount}],
      currencyCode: 'KES',
    }
   console.log(options)
  airtime
    .send(options)
    .then((response) => {
      console.log(response);
      res.status(200).json({ message: 'Airtime  sent.' });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'airtiime not sent' });
    });
};

app.post('/send', (req, res) => {
  sendAirtime(res);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
