const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const currentWeather = document.querySelector("#current-weather")


searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim();
    let searchHistory = JSON.parse(localStorage.getItem('city')) || []
    searchHistory.push(searchTerm);
    localStorage.setItem('city', JSON.stringify(searchHistory));
    getWeatherForecast(searchTerm)

})

function getWeatherForecast(searchTerm) {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=1b379b898c61194663dd2297173af6e3&units=imperial";

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // This data is the current weather //
            console.log(data);
            getWeather5DayForecast(data.coord.lat, data.coord.lon)
            const cityName = document.createElement('h2')
            cityName.textContent = data.name
            const cityDate = document.createElement('p')
            cityDate.textContent = dayjs()
            const cityIcon = document.createElement('img')
            cityIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+ data.weather[0].icon + '.png')
            const cityTemp = document.createElement('p')
            cityTemp.textContent = "Current Temperature: " + data.main.temp + " F"
            const cityWind = document.createElement('p')
            cityWind.textContent = "Current Wind Conditions: " + data.wind.speed + " mph"
            const cityHumidity = document.createElement('p')
            cityHumidity.textContent = "Current Humidity: " + data.main.humidity
            // Lists items to append in the order you would like to see them //
            currentWeather.append(cityName, cityDate, cityIcon, cityTemp, cityWind, cityHumidity)
        });
}

function getWeather5DayForecast(lat, lon) {
    const apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=1b379b898c61194663dd2297173af6e3&units=imperial";

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // This data is the 5 day forecast //
            for (i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("09:00:00")) {
                    console.log(data.list[i])

                }
            }
        });
}

