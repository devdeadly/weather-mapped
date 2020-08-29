// Get dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || "8000";
const app = express();
const axios = require("axios");

const GOOGLE_API_KEY = "AIzaSyCVBMEcHnTt9TMwORDwgj1wfmv86t9eRqw";
const DARKSKY_API_KEY = "b85a054525a7d6b3665d54f019939acb";
const DARK_SKY_URL = "https://api.darksky.net/forecast";

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/api/weather/:lat,:lng", (req, res) => {
  const { lat, lng } = req.params;
  axios.get(`${DARK_SKY_URL}/${DARKSKY_API_KEY}/${lat},${lng}`).then((resp) => {
    res.json(resp.data);
  });
});

app.post(`/api/location`, async (req, res) => {
  const { location } = req.body;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&address=${location}`
  );
  res.json(response.data.results[0]);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT} ✨`));
