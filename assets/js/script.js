const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchHistoryList = document.getElementById('search-history')
const currentWeather = document.querySelector("#current-weather")
const futureWeather = document.querySelector("#future-weather")

// Event listener for Search Button entry by user //
searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim();
    getWeatherForecast(searchTerm)

    // Stores user input into local storage //
    let searchHistory = JSON.parse(localStorage.getItem('city')) || []
    searchHistory.push(searchTerm);
    localStorage.setItem('city', JSON.stringify(searchHistory))

    // Lets the user select previous items from local storage and appends them to page
    searchHistory.forEach(function (entry) {
        const listItem = document.createElement('button');
        listItem.textContent = entry;
        listItem.addEventListener('click', function () {
            getWeatherForecast(entry);
        });

        searchHistoryList.appendChild(listItem);
    });
})


function getWeatherForecast(searchTerm) {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=1b379b898c61194663dd2297173af6e3&units=imperial";

    // Fetches data for the current day forecast //
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            getWeather5DayForecast(data.coord.lat, data.coord.lon)

            // Creates a divider for the current day forecast //
            const divider = document.createElement('div');
            divider.classList.add('divider');
            document.getElementById('current-weather').append(divider);

            // This data is the current weather //
            const cityName = document.createElement('h2')
            cityName.textContent = data.name
            const cityDate = document.createElement('p')
            cityDate.textContent = dayjs().format('MMMM D, YYYY')
            const cityIcon = document.createElement('img')
            cityIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png')
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

    // Fetches data for the 5 day forecast //
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.includes("09:00:00")) {
                    console.log(data.list[i])

                    // Creates a divider for each of the 5 day forecast //
                    const divider = document.createElement('div');
                    divider.classList.add('divider');
                    document.getElementById('future-weather').append(divider);

                    // This data is the 5 day forecast //
                    const cityDate = document.createElement('p')
                    cityDate.textContent = data.list[i].dt_txt
                    const cityIcon = document.createElement('img')
                    cityIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png')
                    const cityTemp = document.createElement('p')
                    cityTemp.textContent = "Temperature: " + data.list[i].main.temp + " F"
                    const cityWind = document.createElement('p')
                    cityWind.textContent = "Wind Conditions: " + data.list[i].wind.speed + " mph"
                    const cityHumidity = document.createElement('p')
                    cityHumidity.textContent = "Humidity: " + data.list[i].main.humidity

                    // Lists items to append in the order you would like to see them //
                    futureWeather.append(cityDate, cityIcon, cityTemp, cityWind, cityHumidity)
                }
            }
        });
}