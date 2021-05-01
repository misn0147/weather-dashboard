var currentDay = (moment().format('(MM-DD-YYYY)'));
console.log (currentDay);
var historyButtons = document.querySelector("#history-btns");
var cityButtons = document.querySelector(".history-btn");



function showFuture() {
    var futureDaysEl = document.querySelector("#futureDays");
    futureDaysEl.removeAttribute("class", "hide");
}


function runProgram() {
    var cityName = document.getElementById('searchCity').value;
    console.log(cityName);
    var newButton = document.createElement('button');
    newButton.setAttribute('class', "history-btn");
    newButton.textContent = cityName;
    historyButtons.appendChild(newButton);

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
            return fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial' + '&appid=d80f9148da9f22ae1bde4d77fec27e30');
        })
        .then(function(weatherResult) {
            return weatherResult.json();
        })
        .then(function(weatherResult) {
            console.log(weatherResult);

            var imageEl = document.querySelector("#icon");
            var currentIcon = weatherResult.current.weather[0].icon;
            var iconEl = document.createElement('img');
            imageEl.innerHTML = '';
            iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + currentIcon + '.png');
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

            var threeDays = (moment().add(3, 'days').format('MM-DD-YYYY'))
            var dayThreeTemp = weatherResult.daily[2].temp.day;
            var dayThreeWind = weatherResult.daily[2].wind_speed;
            var dayThreeHumid = weatherResult.daily[2].humidity;
            var dayThreeEl = document.querySelector('#day-three');
            dayThreeEl.innerHTML = '<h4>' + threeDays + '<br>' + '<br>' + "Temp: " + dayThreeTemp + '<br>' + "Wind: " + dayThreeWind + " MPH" + '<br>' + "Humidity: " + dayThreeHumid + "%" + '<h4>';

            var fourDays = (moment().add(4, 'days').format('MM-DD-YYYY'))
            var dayFourTemp = weatherResult.daily[3].temp.day;
            var dayFourWind = weatherResult.daily[3].wind_speed;
            var dayFourHumid = weatherResult.daily[3].humidity;
            var dayFourEl = document.querySelector('#day-four');
            dayFourEl.innerHTML = '<h4>' + fourDays + '<br>' + '<br>' + "Temp: " + dayFourTemp + '<br>' + "Wind: " + dayFourWind + " MPH" + '<br>' + "Humidity: " + dayFourHumid + "%" + '<h4>';

            var fiveDays = (moment().add(5, 'days').format('MM-DD-YYYY'))
            var dayFiveTemp = weatherResult.daily[4].temp.day;
            var dayFiveWind = weatherResult.daily[4].wind_speed;
            var dayFiveHumid = weatherResult.daily[4].humidity;
            var dayFiveEl = document.querySelector('#day-five');
            dayFiveEl.innerHTML = '<h4>' + fiveDays + '<br>' + '<br>' + "Temp: " + dayFiveTemp + '<br>' + "Wind: " + dayFiveWind + " MPH" + '<br>' + "Humidity: " + dayFiveHumid + "%" + '<h4>';
        })
    showFuture();
};
