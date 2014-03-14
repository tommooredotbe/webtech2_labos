function Weather(now)
{
    this.now = now;

    this.startApp();
}

Weather.prototype.startApp = function()
{
	var xcoords = localStorage.getItem("xcoords");
    var ycoords = localStorage.getItem("ycoords");
    var weatherData = localStorage.getItem("weatherData");

    //als gegevens leeg zijn, haal ze binnen
    if (weatherData === null){
        this.getLocation();
        this.getWeather();
    }else{
        //If weatherData nieuwer dan 30 mins, gebruik data
        //timestamp meegegeven wnr data in localstorage wordt geplaatst
        var d = new Date();
        var weatherTimestamp = localStorage.getItem("weatherTimestamp");
        var thirtyMinsAgo = d.getTime() - 1800000; //1800000 milisec = 30 mins
        // als timestamp in mili groter is dan nu-30mins
        if(weatherTimestamp>thirtyMinsAgo)
        {
            this.setWeather();
        }
        // timestamp gaat op een gegeven moment kleiner zijn waardoor 30 mins geleden of meer de cache hernieuwd is
        // dan gaan we terug gegevens binnenhalen
        else{
            this.getLocation();
            this.getWeather();
        }
    }    
}

Weather.prototype.getLocation = function()
{

    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(useGeoData);
    }
    else
    {
      $(".container").text("Geolocation is not supported by this browser.");
      console.log("Geolocation is not supported by this browser.");
    } 
}

function useGeoData(position) 
{
    Weather.prototype.setCoords = function(position)
    {
        var xcoords = position.coords.latitude;
        var ycoords = position.coords.longitude;

        localStorage.setItem("xcoords",xcoords);
        localStorage.setItem("ycoords",ycoords);

        console.log(localStorage.getItem("xcoords"));
        console.log(localStorage.getItem("ycoords"));
    }
}



Weather.prototype.getWeather = function()
{ 
    //Gegevens nodig voor api aan te spreken
    var xcoords = localStorage.getItem("xcoords");
    var ycoords = localStorage.getItem("ycoords");
    var apiKey = "521b6d1c316a5c94ec24999766d38196";
    var apiUrl = "https://api.forecast.io/forecast/"+apiKey+"/"+xcoords+","+ycoords+"?callback=?&units=si";
    console.log(apiUrl);

    $.ajax({
        type: "GET",
        url: apiUrl,
        dataType: 'jsonp',
        success: function(response) //Wnr get succesvol is gaat hij deze functie uitvoeren
        {
            console.log("got weather data from server");
            localStorage.setItem("weatherData",JSON.stringify(response));

            //timestamp zetten
            var d = new Date();
            localStorage.setItem("weatherTimestamp",d.getTime());
            console.log(localStorage.getItem("weatherTimestamp"));
        }
    });

    this.setWeather();
}

Weather.prototype.setWeather = function()
{
    console.log("ready to set data from api");
    //get data 

    var weatherData = localStorage.getItem("weatherData");

    if (weatherData===null)
    {
        this.getLocation();
    }else{
    var localWeatherData = JSON.parse(weatherData);

    //welke temperatuur nu
    console.log(localWeatherData);
        var tempC = Math.round(localWeatherData.currently.temperature) + '°';
        //console.log(tempF);
       // var tempC = Math.round((tempF- 32) * (5 / 9));
        $("#now-degrees").text(tempC);

    //bodybg

    //icon
        var icon = localWeatherData.currently.icon;
        localStorage.setItem("icon",icon);
        console.log(icon);
    } 
}

/*initiate*/
var weather = new Weather($("now"));

//icon plugin
var icon = localStorage.getItem("icon");

var skycons = new Skycons({"color": "white"});
skycons.set("now-icon", icon);
skycons.play();
