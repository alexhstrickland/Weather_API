$("document").ready(function(){

    var city;
    var country;
    var cityName;
    var results;
    var currentTemp;
    var windSpeed;
    var humidity;
    var UVIndexText;
    var UVIndexColor;
    var iconW;
    var iconImage;
    var imageUrl;
    var lat;
    var lon;
    var dayTemps;
    var dayHumidity;
    var dayIcon;
    var dayImageUrl;
    var dayIconImage;
    var response;
    var resultsTwo;
    var currentDay = "(" + moment().format('l') + ")";

    // var recentCities = [];

    $("#cityBtn").on("click", function(event) {
        event.preventDefault();
        clearInfo();
        var city = $("#city").val();
        getInfo(city);
        addCities(city);

    })


    function addCities(city) {
        var recentCities = JSON.parse(localStorage.getItem("History")) || [];
        recentCities.push(city);
        if (recentCities.length == 6) {
            recentCities.shift()
        }


        $("#recentSearches").html("");


        for (var i = 0; i < recentCities.length; i++) {
            localStorage.setItem("History", JSON.stringify(recentCities));
            var btn = $("<li class='list-group-item'>").html(recentCities[i]);
            $("#recentSearches").append(btn);
        }
    }


    function clearInfo() {
        $("#cityName").html("");
        $("#currentTemp").html("");
        $("#humidity").html("");
        $("#windSpeed").html("");
        $("#UVIndex").html("");

    }


    function getInfo(city) {
        var city;
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            getMoreInfo(response);
            displayForecast(response);          
        })
    }

    function getMoreInfo(response) {
        var results =  response;
        var iconW = results.weather[0].icon;
        var imageUrl = "http://openweathermap.org/img/w/" + iconW + ".png";
        var iconImage = $("<img>");
        iconImage.attr("src", imageUrl);
        var currentTemp = results.main.temp + " F";
        var humidity = results.main.humidity;
        var windSpeed = results.wind.speed + " MPH";
        var lat = results.coord.lat;
        var lon = results.coord.lon;
    
    
        var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var resultsTwo = response;
            displayForecast(resultsTwo);
        


        var country = resultsTwo.city.country;
        var cityName = results.name + ", " + country + " " + currentDay;
    
        $("#cityName").append(cityName, iconImage);
        $("#currentTemp").append("Temperature: " + currentTemp);
        $("#humidity").append("Humidity: " + humidity + "%");
        $("#windSpeed").append("Wind Speed: " + windSpeed);


            var UVURL= "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

            $.ajax({
                url: UVURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                var UVIndexText = response.value;
                var UVIndex = $("<button type='button'>");

                if (parseInt(UVIndexText) < 3) {
                    var UVIndexColor = "btn btn-success";
                } else if (parseInt(UVIndexText) >= 3 && parseInt(UVIndexText) <= 5 ) {
                    var UVIndexColor = "btn btn-warning";
                } else if (parseInt(UVIndexText) > 5) {
                    var UVIndexColor = "btn btn-danger";
                }
                UVIndex.addClass(UVIndexColor);

                $("#UVIndex").append(("UV Index: "),(UVIndex.append(UVIndexText)));



            })
        })
    }

    $("#recentSearches").on("click", "li", function() {
        clearInfo();
        var city = $(this).html();
        getInfo(city);
        addCities(city);
    });

    function displayForecast(resultsTwo) {
        for (var i = 4; i < resultsTwo.list.length; i+=8) {
            var dayTemps = resultsTwo.list[i].main.temp;
            var dayHumidity = resultsTwo.list[i].main.humidity;
            var dayIcon = resultsTwo.list[i].weather[0].icon;
            var dayImageUrl = "http://openweathermap.org/img/w/" + dayIcon + ".png";
            var dayIconImage = $("<img>");
            dayIconImage.attr("src", dayImageUrl);

            $("#weather-" + i).append(dayIconImage);
            $("#weather-" + i).append(dayTemps);
            $("#weather-" + i).append(dayHumidity);
        
            
        }
    }
    
























})

