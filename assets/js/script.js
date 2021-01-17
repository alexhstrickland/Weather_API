$("document").ready(function(){

    var city;
    var cityName;
    var results;
    var currentTemp;
    var windSpeed;
    var humidity;
    var UVIndex;
    var iconW;
    var iconImage;
    var imageUrl;
    var currentDay = "(" + moment().format('l') + ")";

    $("#cityBtn").on("click", function(event) {
        event.preventDefault();
        var city = $("#city").val();
        console.log(city);
        getInfo(city);
    });

    // var city = "miami"; 
    // console.log(city);

    function getInfo(city) {
        var city;
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            // getMoreInfo(response);
        })
    }

    function getMoreInfo(response) {
        var results =  response;
        var iconW = results.weather[0].icon;
        var imageUrl = "http://openweathermap.org/img/w/" + iconW + ".png";
        var iconImage = $("<img>");
        iconImage.attr("src", imageUrl)
        var cityName = results.name + " " + currentDay + iconImage;
        // var cityName = results.name + ", " + results.city.country + " " + currentDay;
        var currentTemp = results.main.temp + " F";
        var humidity = results.main.humidity;
        var windSpeed = results.wind.speed + " MPH";
        // var UVIndex = ;
        console.log(cityName, currentTemp, humidity, windSpeed);
        $("#cityName").append();
        $("#currentTemp").append();
        $("#humidity").append();
        $("#windSpeed").append();
    }

























})

