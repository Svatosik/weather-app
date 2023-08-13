import Notiflix from 'notiflix';

import WeatherAppApi from './js/api-weather-app'

const weatherAppInsance = new WeatherAppApi();

const inputEl = document.querySelector('.input');
const searchFormEL = document.querySelector('.search-form');
const weatherAppEl = document.querySelector('.weather-app-card');

searchFormEL.addEventListener('submit', handleSearchForm);

const convertSecondsToHourandMinutes = seconds => {
    const date = new Date(seconds * 1000);

    return `${date.getHours()}:${date.getMinutes()}`;
}
function handleSearchForm(evt) {
    evt.preventDefault();
    const inputValue = inputEl.value.trim();
    if (!inputValue) {
      Notiflix.Notify.failure('Please enter city!');
      return;
    }
    weatherAppEl.innerHTML = '';
    weatherAppInsance.requestCity = inputValue;
    // console.log(weatherAppInsance.requestCity);
    weatherAppInsance.fetchWeatherByCity().then(data => {
      console.log(data);
    });
    
}



