
const apiKey = "9829a4855c0d59b42e6f434613c07c77";
var lat;
var lon;
var currCon;
var currTemp;
var currWind;
var currHum;
var currUv;
var tempArr = [];
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=ottawa&units=metric&appid=9829a4855c0d59b42e6f434613c07c77";
var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?units=metric";

function getWeather() {
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                lat = data.coord.lat;
                lon = data.coord.lon;
                currCon = data.weather[0].main;
                currTemp = data.main.temp;
                currWind = data.wind.speed;
                currHum = data.main.humidity;
                console.log(data);
                console.log(lon);
                console.log(lat);
                fetch(apiOneCall + "&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey).then(function (oneCallResponse) {
                    if (oneCallResponse.ok) {
                        oneCallResponse.json().then(function (oneCallData) {
                            console.log(oneCallData);
                            currUv = oneCallData.uvi;
                            tempArr = oneCallData.daily;
                        });
                    }
                    else {
                        alert("Something went wrong");
                    }
                });
            });
        }
        else {
            alert("enter a valid city");
        }
    });
displayWeather();
}

function displayWeather(){

}

getWeather();