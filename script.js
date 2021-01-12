const searchButton = $("#searchButton");
const locationInput = $("#searchInput");

const APIKey = "3de6b63c33a60d225104b1ff597cb08d";

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  var location = locationInput.val().trim();
  var currentweatherURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    location +
    "&appid=" +
    APIKey;
  $.ajax({
    url: currentweatherURL,
    method: "GET",
  }).then(function (response) {
    //display response in the console log

    var locationInfo = response;
    console.log(locationInfo);

    //var contentEl = $(".content");
    var locationName = locationInfo.name;
    var nameEl = $("#nameEl");
    nameEl.text(`City: ${locationName}`);

    var tempEl = $("#temp");
    var tempF = (locationInfo.main.temp - 273.15) * 1.8 + 32;
    tempEl.text(`Temperature: ${tempF.toFixed(2)}`);

    var humidity = locationInfo.main.humidity;
    var humidityEl = $("#humidity");
    humidityEl.text(`Humidity: ${humidity}`);

    var windspeed = locationInfo.wind.speed;
    var windspeedEl = $("#windspeed");
    windspeedEl.text(`Windspeed: ${windspeed}`);
  });
  render5day(location);
});

function render5day(location) {
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    location +
    "&appid=" +
    APIKey;
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    var forecastInfo = response;

    console.log(forecastInfo);
  });
}

// //make elements dynamically to create cards
//   var cardEl = $(".card");
//   cardEl.attr("style", "width: 18 rem, font family: Georgia");
//   var cardBodyEl = $("<div>").addClass("card-body");

// //Card Header Name
//   var forecastTitle = forecastTitle.name;
//   var forecastTitleEl = $("<h5>").text(forecastTitle);
// cardEl.append(forecastTitleEl);
// cardEl.append(cardBodyEl);

//   var cardtextEl = $("<p>").addClass("card-text");

// //   <div class="card" style="width: 18rem">
//   <img class="card-img-top" src="..." alt="Card image cap" />
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">
//       Some quick example text to build on the card title and make up the
//       bulk of the card's content.
//     </p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>

//   //
//);

//Card Header Name

// var uvindex = locationInfo.current.uvi;
// var uvindexEl = $("#UVIndex");
// uvindexEl.text(`UV Index: ${uvindex}`);

// console.log(location);
//   $(".city").html("<h1>" + response.name + "Weather</h1>");
//   $(".date").text(
//     luxon.DateTime.local().toLocaleString({
//       weekday: "long",
//       month: "long",
//       day: "2-digit",

//

//   let weatherArt = locationInfo.weather[0].icon;
//   //let iconurl = "https://openweatherman.org/img/w/" + weatherArt;
//   var iconEl = $("#icon");
//   iconEl.attr({ src: locationInfo.weather[0].icon });

//   //
//   console.log($("#searchInput").val());
// var cardEl = $("<div>").addClass("card");
// // var imageEl = $("<img>");
// // imageEl.attr({ src: weather
// var locationInfo = location.info;
// var cardBodyEl = $("<div>").addClass("card-body");
// var cardTitleEl = $("<h5>").text(locationInfo)

//do the same thing as above, but to the cards
// }

// api.openweathermap.org/data/2.5/forecast?q= + {city name},{state code},{country code}&appid={API key}
