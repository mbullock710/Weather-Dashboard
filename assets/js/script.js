const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchTerm = searchInput.value.trim();

searchButton.addEventListener('click', function () {
    localStorage.setItem('city', searchTerm);
})

function getWeatherForecast() {
    const apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchTerm + "&limit={limit}&appid=1b379b898c61194663dd2297173af6e3";

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}