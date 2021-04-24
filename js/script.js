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
            console.log(latitude);
            console.log(longitude);
        
            return fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=d80f9148da9f22ae1bde4d77fec27e30')
        .then(function(weatherResult) {
            return weatherResult.json();
        })
    })
        .then(function(weatherResult) {
            console.log(weatherResult);
            var responseContainerEl = document.querySelector('#weather-container');
            responseContainerEl.innerHTML = '';
            
        });
    }
