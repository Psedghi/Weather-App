let appid = "96ee1d08e2fd99955dbc553321719155"
let units = 'imperial';
let searchMethod;
//used this website to access API: https://openweathermap.org/current#name
function getSearchMethod(searchTerm){
    //determines if user inputs a city or zip code
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod = 'zip';
    }else{
        searchMethod = 'q';
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`).then(result => {
        return result.json();
    }).then(result =>{
        init(result);
    })
}
function init(resultFromServer){
    //Displays background as conditions images from files
    switch (resultFromServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("clear.jpeg")';
            break;
        case "Clouds":
            document.body.style.backgroundImage = 'url("Clouds.webp")';
            break;
        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.style.backgroundImage = 'url("Rain.jpeg")';
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("Thunder.jpeg")';
            break;
        case "Snow":
            document.body.style.backgroundImage = 'url("Snow.jpeg")';
            break;
        default:
            break;
    }

let weatherDescription = document.getElementById('weatherDescriptionHeader');
let temperatureElement = document.getElementById('temperature');
let humidityElement = document.getElementById('humidity');
let windSpeedElement = document.getElementById('windSpeed');
let cityHeader = document.getElementById('cityHeader');
let weatherIcon = document.getElementById('documentIconImg');
//displays weather icon
weatherIcon.src = ' http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
//Text Description of Weather Conditions
let resultDescription = resultFromServer.weather[0].description;
weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
//the following will round the temp to the nearest whole num

temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'mph';
cityHeader.innerHTML = resultFromServer.name;
humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + "%";

setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = "visible";
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})
