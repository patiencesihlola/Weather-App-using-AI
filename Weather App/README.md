
# Weather Service

This project provides a simple weather service that fetches current weather information for a given city using the Open-Meteo Geocoding and Weather Forecast APIs.

## Features

- Retrieve weather information by city name
- Provides temperature in Celsius
- Includes a human-readable weather description
- Error handling for invalid city names, API failures, and network issues

## Installation

1. Clone this repository or download the `weatherService.js` file.
2. Ensure you have a modern browser or Node.js environment that supports ES6+ features.

## Usage

### In a browser environment:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Service Demo</title>
</head>
<body>
    <h1>Weather Service Demo</h1>
    <div id="result"></div>

    <script type="module">
        import { getWeatherForCity } from './weatherService.js';

        getWeatherForCity('London')
            .then(weatherInfo => {
                document.getElementById('result').textContent = JSON.stringify(weatherInfo, null, 2);
            })
            .catch(error => {
                document.getElementById('result').textContent = `Error: ${error.message}`;
            });
    </script>
</body>
</html>
In a Node.js environment:
import { getWeatherForCity } from './weatherService.js';

getWeatherForCity('New York')
    .then(weatherInfo => {
        console.log('Weather Information:', weatherInfo);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
API Reference
getWeatherForCity(cityName)
Fetches weather information for the specified city.
Parameters
cityName (string): The name of the city to fetch weather information for.
Returns
A Promise that resolves to an object containing:
cityName (string): The name of the city.
temperature (number): The current temperature in Celsius.
weatherCode (number): The weather code from the API.
weatherDescription (string): A human-readable description of the weather.
Errors
The function may throw the following errors:
"Invalid city name: [cityName]" if the city is not found.
"Network error: Please check your internet connection" for network-related issues.
"An unexpected error occurred while fetching weather data" for other unexpected errors.
Code Structure
The weatherService.js file contains two main functions:
1.
getWeatherForCity(cityName): The main function to fetch weather data.
2.
getWeatherDescription(weatherCode): A helper function to convert weather codes to human-readable descriptions.
Inline Comments
weatherService.js
Apply

async function getWeatherForCity(cityName) {
  try {
    // Step 1: Get latitude and longitude from the Geocoding API
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = await geocodingResponse.json();

    // Check if the city was found
    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error('City not found');
    }

    const { latitude, longitude } = geocodingData.results[0];

    // Step 2: Get weather data using the coordinates
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // Step 3: Prepare and return the weather information
    return {
      cityName: cityName,
      temperature: weatherData.current_weather.temperature,
      weatherCode: weatherData.current_weather.weathercode,
      weatherDescription: getWeatherDescription(weatherData.current_weather.weathercode)
    };
  } catch (error) {
    // Error handling for different scenarios
    if (error.message === 'City not found') {
      throw new Error(`Invalid city name: ${cityName}`);
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Please check your internet connection');
    } else {
      throw new Error('An unexpected error occurred while fetching weather data');
    }
  }
}

// Helper function to convert weather codes to descriptions
function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    // ... (other weather codes and descriptions)
  };

  return weatherDescriptions[weatherCode] || 'Unknown';
}

// Example usage
getWeatherForCity('London')
  .then(weatherInfo => {
    console.log('Weather Information:', weatherInfo);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
License
This project is open source and available under the MIT License.
Contributing
Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.
Author
Reference: Tabnine AI 
Project Link: Tabnine AI

This README.md file provides a comprehensive guide to your weather service project. It includes:

1. An overview of the project
2. Features list
3. Installation instructions
4. Usage examples for both browser and Node.js environments
5. API reference for the `getWeatherForCity` function
6. Code structure explanation with inline comments
7. License information
8. Contributing guidelines
9. Author information and project link



You can save this content in a file named `README.md` in the root directory of your project. This will provide clear documentation for anyone who wants to use or contribute to your weather service project.
README.md
README.md
Main.py
Main.py
(1-4)
Workspace indexing: Done

Reference
I declare I used AI to build this weather app. I used Tabnine AI.
