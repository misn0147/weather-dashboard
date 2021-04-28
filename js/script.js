var currentDay = (moment().format('(MM-DD-YYYY)'));
console.log (currentDay);


function showFuture() {
    var futureDaysEl = document.querySelector("#futureDays");
    futureDaysEl.removeAttribute("class", "hide");
}

function runProgram() {
    var cityName = document.getElementById('searchCity').value;
    console.log(cityName);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=d80f9148da9f22ae1bde4d77fec27e30')
        .then(function(cityNameData) {
            return cityNameData.json();
        })
        .then(function(cityNameData) {
            console.log(cityNameData);
            var searchReponse = cityNameData.name;
            var responseHeaderEl = document.querySelector('#response-header');
            responseHeaderEl.innerHTML = '<h2>' + searchReponse + " " + currentDay + '<h2>';
            var latitude = cityNameData.coord.lat;
            var longitude = cityNameData.coord.lon;
            return fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial' + '&appid=d80f9148da9f22ae1bde4d77fec27e30')
        })
        .then(function(weatherResult) {
            return weatherResult.json();
        })
        .then(function(weatherResult) {
            console.log(weatherResult);

            var imageEl = document.querySelector("#icon");
            var currentIcon = weatherResult.current.weather[0].icon;
            var iconEl = document.createElement('img');
            iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + currentIcon + '@2x.png');
            imageEl.appendChild(iconEl);


            var tempResult = weatherResult.current.temp;
            var tempContainerEl = document.querySelector('#temp-container');
            tempContainerEl.innerHTML = '<h5>' + "Temp: " + tempResult + '<h5>';

            var windResult = weatherResult.current.wind_speed;
            var windContainerEl = document.querySelector('#wind-container');
            windContainerEl.innerHTML = '<h5>' + "Wind: " + windResult + " MPH" + '<h5>';

            var humidityResult = weatherResult.current.humidity;
            var humidityContainerEl = document.querySelector('#humidity-container');
            humidityContainerEl.innerHTML = '<h5>' + "Humidity: " + humidityResult + "%" + '<h5>';

            var uvResult = weatherResult.current.uvi;
            var uvContainerEl = document.querySelector('#uv-container');
            uvContainerEl.innerHTML = '<h5>' + "UV Index: " + uvResult + '<h5>';           
        

            var tomorrow = (moment().add(1, 'days').format('MM-DD-YYYY'))
            var dayOneTemp = weatherResult.daily[0].temp.day;
            var dayOneWind = weatherResult.daily[0].wind_speed;
            var dayOneHumid = weatherResult.daily[0].humidity;
            var dayOneEl = document.querySelector('#day-one');
            dayOneEl.innerHTML = '<h4>' + tomorrow + '<br>' + '<br>' + "Temp: " + dayOneTemp + '<br>' + "Wind: " + dayOneWind + " MPH" + '<br>' + "Humidity: " + dayOneHumid + "%" + '<h4>';

            var twoDays = (moment().add(2, 'days').format('MM-DD-YYYY'))
            var dayTwoTemp = weatherResult.daily[1].temp.day;
            var dayTwoWind = weatherResult.daily[1].wind_speed;
            var dayTwoHumid = weatherResult.daily[1].humidity;
            var dayTwoEl = document.querySelector('#day-two');
            dayTwoEl.innerHTML = '<h4>' + twoDays + '<br>' + '<br>' + "Temp: " + dayTwoTemp + '<br>' + "Wind: " + dayTwoWind + " MPH" + '<br>' + "Humidity: " + dayTwoHumid + "%" + '<h4>';
        })
    showFuture();
};
