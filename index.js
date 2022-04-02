const express = require("express");

// Import the axios library, to make HTTP requests
const axios = require("axios");

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = "sb-clone-24c33e10-98f0-4d90-ba95-46d907faae05!b60812|workflow!b1774";
const clientSecret = "423b5e39-b6bf-4e5e-aafc-22140289568e$H34kPY3OZkv9lhXhuJGr5qZiuviMwCiUZPLo9RPe_d0=";

const app = express();


// Declare the redirect route
app.get("/oauth/redirect", (req, res) => {
    console.log('ingreso al get')
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code;

  
  axios({
    // make a POST request
    method: "post",
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `http://256c25d4trial.authentication.us10.hana.ondemand.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token;
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/welcome.html?access_token=${accessToken}`);

    console.log(accessToken,'token')
  });
});

app.use(express.static(__dirname + "/public"));
app.listen(8080);
