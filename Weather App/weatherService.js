async function getWeatherForCity(cityName) {
  try {
    // Step 1: Get latitude and longitude from the Geocoding API
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = await geocodingResponse.json();

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
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    95: 'Thunderstorm',
    // Add more weather codes and descriptions as needed
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