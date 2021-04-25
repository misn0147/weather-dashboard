var currentDay = (moment().format('(MM-DD-YYYY)'));
console.log (currentDay);

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

        //     function futureWeather(dailyWeatherResult) {
        
        //         for (var i = 0; i < weatherResult.length; i++) {
        //             futureWeather(weatherResult.daily[i])
        //             // var futureTempEl = dailyWeatherResult.temp.day;
        //             // var futureWindEl = dailyWeatherResult.wind_speed;
        //             // var futureHumidEl = dailyWeatherResult.humidity;
        //             // var futureContainerEl = document.querySelector("#day")
        //             // futureContainerEl.innerHTML = '<h5>' + futureTempEl + futureWindEl + futureHumidEl + '<h5>';
        //             console.log(futureWeather);
        //         }
        //     }
        // futureWeather();
        })
};
