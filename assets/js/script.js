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
    var currentDay = "(" + moment().format('l') + ")";

    var recentCities = [];

    $("#cityBtn").on("click", function(event) {
        event.preventDefault();
        clearInfo();
        var city = $("#city").val();
        console.log(city);
        getInfo(city);
        addCities(city);

    })

    function addCities(city) {
        recentCities.push(city);
        console.log(recentCities);
        if (recentCities.length == 5) {
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
            console.log(response);
            getMoreInfo(response);
        })
    }

    function getMoreInfo(response) {
        var results =  response;
        var iconW = results.weather[0].icon;
        var imageUrl = "http://openweathermap.org/img/w/" + iconW + ".png";
        console.log(imageUrl);
        var iconImage = $("<img>");
        iconImage.attr("src", imageUrl);
        console.log(iconImage);
        var currentTemp = results.main.temp + " F";
        var humidity = results.main.humidity;
        var windSpeed = results.wind.speed + " MPH";
        var lat = results.coord.lat;
        var lon = results.coord.lon;
        console.log(lat, lon);
    
    
        var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
        


        var country = response.city.country;
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

    
























})

