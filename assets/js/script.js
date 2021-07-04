
const apiKey = "9829a4855c0d59b42e6f434613c07c77";
var lat;
var lon;
var cityName = "Ottawa";
var currCon;
var currTemp;
var currWind;
var currHum;
var currUv = "";
var tempArr = [];
var cityArr = [];
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
var apiUrlTemp = "http://api.openweathermap.org/data/2.5/weather?q=ottawa&units=metric&appid=9829a4855c0d59b42e6f434613c07c77";
var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
var apiOneCall = "https://api.openweathermap.org/data/2.5/onecall?units=metric";

var cityInputEl = document.querySelector("#cityinput");

function getWeather() {
    fetch(apiUrl + cityName + "&units=metric&appid=" + apiKey).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                cityName = data.name;
                console.log(cityName);
                lat = data.coord.lat;
                lon = data.coord.lon;
                currCon = data.weather[0].main;
                currTemp = data.main.temp;
                currWind = data.wind.speed;
                currHum = data.main.humidity;
                console.log(currTemp);
                console.log(lon);
                console.log(lat);
                fetch(apiOneCall + "&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey).then(function (oneCallResponse) {
                    if (oneCallResponse.ok) {
                        oneCallResponse.json().then(function (oneCallData) {
                            console.log(oneCallData);
                            currUv = oneCallData.current.uvi;
                            tempArr = oneCallData.daily;
                            console.log(currUv);
                            displayWeather();
                            saveHistory();
                            populateHistory();
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
            cityArr = cityArr.slice(1);
        }
    });

}

function displayWeather() {
    var cityText = $('<div>');
    var tempText = $('<div>');
    var windText = $('<div>');
    var humText = $('<div>');
    var uvText = $('<div>');
    cityText.addClass('city-name');
    tempText.addClass('weather-info');
    windText.addClass('weather-info');
    humText.addClass('weather-info');
    uvText.addClass('weather-info');
    cityText.text(cityName);
    tempText.text("Temp: " + currTemp);
    windText.text("Wind: " + currWind);
    humText.text("Humidity: " + currHum);
    uvText.text("UV Index: " + currUv);
    $('.weather').append(cityText);
    $('.weather').append(tempText);
    $('.weather').append(windText);
    $('.weather').append(humText);
    $('.weather').append(uvText);

    for (i = 1; i < 6; i++) {
        var dayClass = '.day' + i;
        var tempDailyText = $('<div>');
        var windDailyText = $('<div>');
        var humDailyText = $('<div>');
        tempDailyText.addClass('daily-weather');
        windDailyText.addClass('daily-weather');
        humDailyText.addClass('daily-weather');
        tempDailyText.text("Temp: " + tempArr[i].temp.day);
        windDailyText.text("Wind: " + tempArr[i].wind_speed);
        humDailyText.text("Humidity: " + tempArr[i].humidity);
        $(dayClass).append(tempDailyText);
        $(dayClass).append(windDailyText);
        $(dayClass).append(humDailyText);
        ;
    }
}

function populateHistory() {
    cityArr = JSON.parse(localStorage.getItem("savedCities"));
    console.log(cityArr);
    if (!cityArr) {
        cityArr = [];
    }
    $('.city-history').empty();
    for (i = 0; i < cityArr.length; i++) {
        var cityHist = $('<div>');
        cityHist.text(cityArr[i]);
        $('.city-history').append(cityHist);
    }
}

function clearContents() {
    $('.weather').empty();
    for (i = 1; i < 6; i++) {
        var dayClass = '.day' + i;
        $(dayClass).empty();
    }
}

function saveHistory() {
    if (!cityArr.includes(cityName)) {
        cityArr.unshift(cityName);
    }
    if (cityArr.length > 10) {
        cityArr.pop();
    }
    localStorage.setItem("savedCities", JSON.stringify(cityArr));
}

$('.container').on('click', '#submitcity', function () {
    clearContents();
    cityName = $('#cityinput').val().trim();
    getWeather();
});

populateHistory();
getWeather();