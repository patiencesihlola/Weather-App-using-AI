
function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');

    if (!cityName) {
        weatherInfoDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    weatherInfoDiv.innerHTML = '<p>Loading...</p>';

    getWeatherForCity(cityName)
        .then(weatherInfo => {
            weatherInfoDiv.innerHTML = `
                <h2>Weather in ${weatherInfo.cityName}</h2>
                <p>Temperature: ${weatherInfo.temperature}°C</p>
                <p>Weather: ${weatherInfo.weatherDescription}</p>
            `;
        })
        .catch(error => {
            weatherInfoDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
3.
//Finally, let's modify the weatherService.js file to remove the example usage at the bottom and export the getWeatherForCity function:
Weather
Apply

// ... (keep all the existing code, but remove the example usage at the bottom)

// Export the function so it can be used in app.js
export { getWeatherForCity };