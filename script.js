const searchButton = $("#searchButton");
const locationInput = $("#searchInput");

$("#searchButton").on("click", function (event) {
  alert("Works?");
  event.preventDefault();
  var location = locationInput.val().trim();

  var APIKey = "3de6b63c33a60d225104b1ff597cb08d";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    location +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //display response in the console log
    console.log(response);

    // console.log(location);
    //   $(".city").html("<h1>" + response.name + "Weather</h1>");
    //   $(".date").text(
    //     luxon.DateTime.local().toLocaleString({
    //       weekday: "long",
    //       month: "long",
    //       day: "2-digit",
  });

  //   let weatherArt = response.weather[0].icon;
  //   let iconurl = "https://openweatherman.org/img/w/" + weatherArt

  //

  //   //
  //   console.log($("#searchInput").val());
  // var cardEl = $("<div>").addClass("card");
  // // var imageEl = $("<img>");
  // // imageEl.attr({ src: weather
  // var locationInfo = location.info;
  // var cardBodyEl = $("<div>").addClass("card-body");
  // var cardTitleEl = $("<h5>").text(locationInfo)
});

// api.openweathermap.org/data/2.5/forecast?q= + {city name},{state code},{country code}&appid={API key}

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
