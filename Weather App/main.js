import { getWeatherForCity } from './weatherService.js';

// Example usage
getWeatherForCity('New York')
  .then(weatherInfo => {
    console.log('Weather Information:', weatherInfo);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });