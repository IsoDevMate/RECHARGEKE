const africastalking = require('africastalking');
const express = require('express');
const axios = require('axios');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const credentials = {
  apikey: process.env.API_KEY,
  username: process.env.USER_NAME,
};

const connectAt = require(africastalking)(credentials);

console.log(connectAt);

const airtime = connectAt.AIRTIME;

// Step 1. MAKE AN API CALL
app.post('/send', async (req, res) => {
  function formatRecipient(phoneNumber, amount) {
    const phoneNumber = req.body.phoneNumber;
    const amount = req.body.amount;
    const currencyCode = 'KES';

    // Validate the input
    if (!phoneNumber || !amount) {
      throw new Error('phoneNumber and amount are required.');
    }

    // Step 1: Format the recipient object
    const formattedRecipient = {
      phoneNumber,
      amount,
      currencyCode,
    };

    return formattedRecipient;
  }

  function generateURLString(recipients){
    // Step 2: Create an array of recipient objects
    const recipientsArray = recipients.map((recipient) => {
      return formatRecipient(recipient.phoneNumber, recipient.amount);
    });

    // Step 3: Convert the array into a JSON string
    const jsonString = JSON.stringify(recipientsArray);

    // Step 4: URL-encode the JSON string
    const encodedString = encodeURIComponent(jsonString);

    // Step 5: Use the encoded string in the desired format
    const urlString = `[${encodedString}]`;

    return urlString;
  }

  const recipients = req.body.recipients; // Assuming you send an array of recipients in the request body
  const urlString = generateURLString(recipients);
  console.log(urlString);

  const options = await axios.post(
    'https://api.africastalking.com/version1/airtime/send',
    {
      username: process.env.USER_NAME,
      maxNumRetry: 3,
      recipients: urlString,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  airtime
    .send(options)
    .then((response) => {
      console.log(response);
      res.status(200).json({ message: 'Airtime  sent y.' });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'airtiime not sent' });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
