const functions = require("firebase-functions");
const fetch = require("node-fetch");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
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

//Test API
app.get("/now", (req, res) => {
  res.send(`${Date.now()}`);
});

// API route in which the price information will be sent from the clientside to push notifications
app.post("/prices/new", (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "key=<AuthorizationKey>"
    },
    body: JSON.stringify({
      notification: {
        title: "Prices",
        body: req.body.prices,
        click_action: "localhost",
        icon: "http://url-to-an-icon/icon.png"
      },
      to: req.body.token
    })
  };
  fetch("https://fcm.googleapis.com/fcm/send", options)
    .then(response => {
      console.log(response);
      res.send({ success: 1 });
    })
    .catch(err => {
      console.log(err);
    });
});

// Create and Deploy Your Cloud Functions
exports.app = functions.https.onRequest(app);
