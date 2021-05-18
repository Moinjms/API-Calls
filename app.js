const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  const city_country = req.body.cityName + "," + req.body.countryName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city_country + "&appid=dd12d7bc1bd6a3710e3b7cd43ebaeaf2&units=metric";
  let stat = "No Data Received from Server"
  https.get(url, function(response) {
    console.log(response.statusCode);
    console.log(req.body.cityName + "," + req.body.countryName);
    if (response.statusCode === 200) {
      response.on("data", function(data) {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const test = weatherData.main.feels_like;
        const icon = weatherData.weather[0].icon;
        // let jokeOutput = showJoke();
        stat = "<img src='http://openweathermap.org/img/wn/" + icon + ".png' alt='icon' height = 120px width = 120px>";
        stat = stat + "<h1 style = 'color:blue;'> Weather in " + city_country + " is " + temp + ", degrees celsius " + "</h1>";
        stat = stat + weatherDescription + " feels like " + test;
        stat = stat + "<h3> Temperature MIN : " + weatherData.main.temp_min + " MAX : " + weatherData.main.temp_max + "<br> </h3>";
        stat = stat + "<hr>";
        stat = stat
        res.send(stat);

      });
    } else {
      res.send("Please Enter a valid city/country");
    };
  });
});


// Port to Start Server on :3000 for LocalHost
app.listen(3000, function() {
  console.log("Server Started...3000");
});
