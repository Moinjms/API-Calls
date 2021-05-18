const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


//Port to Start Server on :3000 for LocalHost
//********** Joke Start *******************
function showJoke(jk) {
  app.get("/", function(req1, res1) {
    jokeOutput = ""
    const urlJoke = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,sexist&format=json&type=single";
    https.get(urlJoke, function(res2, req2) {
      res2.on("data", function(data) {
        const joke = JSON.parse(data);
        jokeOutput = "<p> " + joke.joke + "</p>";
        // console.log(jokeOutput + " Working1");
        // res1.send("hello" + jokeOutput)
        return(jokeOutput);
      });
    });
  });
};

// ************** Joke End ***

let jk = showMessage();
document.querySelector("h1").innerHTML = jk;
//**************

app.listen(3000, function() {
  console.log("Server Started...3000");
});
