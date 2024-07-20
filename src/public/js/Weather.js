
var getWeather = new XMLHttpRequest();
getWeather.open("POST", "/getWeather");


getWeather.send();
getWeather.onload = function(event)
{
    console.log("Response received");
    sessionStorage.removeItem('weatherJSON');
    sessionStorage.setItem('weatherJSON', getWeather.responseText);
    var shortcast = document.getElementById("shortcast").innerHTML;
    var weatherJSON = JSON.parse(sessionStorage.getItem('weatherJSON'));



    for (let i = 0; i < 6; i++ ){
        
        var Wdate = Date.parse((weatherJSON.timelines.daily[i].time).substring(0, 10));
        Wdate = moment(Wdate).format('dddd, MMMM Do');
        var temperatureAvg = Math.round( 32 + (9/5) * weatherJSON.timelines.daily[i].values.temperatureAvg) ;
        document.getElementById("shortcast").innerHTML += "<li>" + Wdate + "  " + temperatureAvg + "&deg F" +"</li>";
    }

}