var APIKey = ""
let searchButton = $("SearchButton");

$("#searchButton").on("click", function(event) {
    alert("Works?")
    event.preventDefault(); 

    var location = $("#searchInput").val();
    console.log($("#searchInput").val())

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + location + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //display response in the console log
        console.log(reponse)
        $(".city").html("<h1>" + response.name + "Weather</h1>");
        $(".date").text(luxon.DateTime.local().toLocaleString({
            weekday: "long",
            month: "long",
            day: "2-digit",
        }));

        let weatherArt = response.weater[0].icon;
        let iconurl = "https://openweatherman.org/img/w/" + weatherArt 
         

    }
}