const searchButton = $("#searchButton");
const locationInput = $("#searchInput");

const APIKey = "3de6b63c33a60d225104b1ff597cb08d";

var locationArray = JSON.parse(localStorage.getItem("locations")) || [];

if (locationArray.length > 0) {
  $.each(locationArray, function (index, value) {
    console.log(index + ": " + value);

    const locationSideName = $("<li>").append(`${value}\n`);
    $("#cityList").append(locationSideName);

    locationSideName.on("click", function (event) {
      console.log("click");
      renderDailyWeather(value);
    });
  });
}

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  var location = locationInput.val().trim();
  renderDailyWeather(location);
});

function renderDailyWeather(location) {
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
    var locationInfo = response;

    var locationName = locationInfo.name;
    var nameEl = $("#nameEl");
    var todaysDate = moment().format("L");
    nameEl.text(`${locationName} ${todaysDate}`);
    locationArray.push(locationName);

    localStorage.setItem("locations", JSON.stringify(locationArray));

    var iconCodeCurrent = locationInfo.weather[0].icon;
    var iconUrlCurrent =
      "http://openweathermap.org/img/wn/" + iconCodeCurrent + ".png";

    var IconCurrentEl = $("<img>").attr("src", iconUrlCurrent);
    nameEl.append(IconCurrentEl);

    var tempEl = $("#temp");
    var tempF = (locationInfo.main.temp - 273.15) * 1.8 + 32;
    tempEl.text(`Temperature: ${tempF.toFixed(2)}`);

    var humidity = locationInfo.main.humidity;
    var humidityEl = $("#humidity");
    humidityEl.text(`Humidity: ${humidity}%`);

    var windspeed = locationInfo.wind.speed;
    var windspeedEl = $("#windspeed");
    windspeedEl.text(`Windspeed: ${windspeed}`);

    var lat = locationInfo.coord.lat;
    var lon = locationInfo.coord.lon;
    render5day(lat, lon);
  });
}

function render5day(lat, lon) {
  $(".card-deck").empty();
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey;
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    var forecastInfo = response;

    console.log(forecastInfo);

    var fiveDay = forecastInfo.daily.slice(0, 5);
    console.log(fiveDay);

    var UVIndex = fiveDay[0].uvi;
    var UVIndexEl = $(".UVIndex");
    UVIndexEl.text(`UVIndex: ${UVIndex}%`);
    console.log(UVIndex);

    if (UVIndex >= 0 && UVIndex <= 3) {
      UVIndexEl.removeClass("Moderate");
      UVIndexEl.removeClass("High");
      UVIndexEl.removeClass("Severe");
      UVIndexEl.addClass("Favorable");
    } else if (UVIndex >= 3 && UVIndex <= 5) {
      UVIndexEl.removeClass("Favorable");
      UVIndexEl.removeClass("High");
      UVIndexEl.removeClass("Severe");
      UVIndexEl.addClass("Moderate");
    } else if (UVIndex >= 5 && UVIndex <= 7) {
      UVIndexEl.removeClass("Favorable");
      UVIndexEl.removeClass("Moderate");
      UVIndexEl.removeClass("Severe");
      UVIndexEl.addClass("High");
    } else {
      UVIndexEl.removeClass("Favorable");
      UVIndexEl.removeClass("Moderate");
      UVIndexEl.removeClass("High");
      UVIndexEl.addClass("Severe");
    }

    fiveDay.map(function (day) {
      var cardEl = $("<div>").addClass("card");
      cardEl.attr("style", "width: 18 rem");
      var cardBlock = $("<div>").addClass("card-block");
      var cardBodyEl = $("<div>").addClass("card-body");

      var datePerDay = moment.unix(day.dt).format("L");
      var datePerDayEl = $("<h3>");
      datePerDayEl.text(`${datePerDay}`);

      cardBodyEl.append(datePerDayEl);
      var humidityDay = day.humidity;
      var humidityDayEl = $("<p>").text(`Humidity: ${humidityDay}%`);
      cardBodyEl.append(humidityDayEl);

      var tempDay = day.temp.min;
      var tempFDay = (tempDay - 273.15) * 1.8 + 32;
      var tempDayEl = $("<p>").text(`Temperature: ${tempFDay.toFixed(2)}`);

      cardBodyEl.append(tempDayEl);

      var iconCode = day.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
      var iconEl = $("<img>").attr("src", iconUrl);

      cardBodyEl.append(iconEl);
      cardEl.append(cardBodyEl);
      cardBlock.append(cardEl);
      $(".card-deck").append(cardBlock);
    });
  });
}
