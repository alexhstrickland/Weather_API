$("document").ready(function(){
    var city = "miami"; 
    console.log(city);
    var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8391498daeaf403c89574dc9e5a777c7";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
})