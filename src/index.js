import Notiflix from 'notiflix';

import WeatherAppApi from './js/api-weather-app';

const weatherAppInsance = new WeatherAppApi();

const inputEl = document.querySelector('.input');
const searchFormEL = document.querySelector('.search-form');
const weatherWrapEl = document.querySelector('.container');

searchFormEL.addEventListener('submit', handleSearchForm);

const convertSecondsToHourandMinutes = seconds => {
  const date = new Date(seconds * 1000);

  return `${date.getHours()}:${date.getMinutes()}`;
};
async function handleSearchForm(evt) {
  evt.preventDefault();
  const inputValue = inputEl.value.trim();
  if (!inputValue) {
    Notiflix.Notify.failure('Please enter city!');
    return;
  }

  weatherAppInsance.requestCity = inputValue;

  try {
    const data = await weatherAppInsance.fetchWeatherByCity();
    console.log(data);
    weatherAppCardRender(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    Notiflix.Notify.failure('We have not such city in our data base');
  }
}

function weatherAppCardRender(data) {
  if (!data || !data.weather || !Array.isArray(data.weather)) {
    console.error('Invalid data structure:', data);
    return;
  }

  const weatherInfo = data.weather[0]; // Assuming the weather info is in the first element of the array
  const mainInfo = data.main;
  const windInfo = data.wind;
  const sysInfo = data.sys;

  const markup = `
    <div class="weather-app-card">
      <h2 class="weather-city">${data.name}</h2>
      <p class="weather-text">Температура: ${mainInfo.temp}&deg;</p>
      <p class="weather-text">Відчувається: ${mainInfo.feels_like}&deg;</p>
      <p class="weather-text">Схід сонця: ${convertSecondsToHourandMinutes(
        sysInfo.sunrise
      )}</p>
      <p class="weather-text">Захід сонця: ${convertSecondsToHourandMinutes(
        sysInfo.sunset
      )}</p>
      <p class="weather-text">Швидкість вітру: ${windInfo.speed}</p>
      <p class="weather-text">Стан неба: ${weatherInfo.description}</p>
    </div>
  `;

  // Append the new weather information to the existing content
  weatherWrapEl.innerHTML = markup;
}
