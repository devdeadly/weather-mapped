// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const xmlhttprequest = require('xmlhttprequest');
const PORT = process.env.PORT || '8000';
const app = express();

require('dotenv').config()

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/api/weather/:LAT,:LNG', function (req, res) {

  const { LAT, LNG } = req.params;
  const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
  const BASE_URL = 'https://api.darksky.net/forecast';

  const xhr = new xmlhttprequest.XMLHttpRequest();

  xhr.open('GET', `${BASE_URL}/${DARKSKY_API_KEY}/${LAT},${LNG}`);
  xhr.send(null);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {   //ready
      if (xhr.status === 200) {  //success
        let weather = JSON.parse(xhr.responseText);
        res.json(weather);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));