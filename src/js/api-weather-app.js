import axios from 'axios';

export default class weatherAppApi {
  #BASE_KEY = '857c0059a36760b1c19eccd67defaf02';
  #BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  defaultSearchParams = {
    units: 'metric',
    lang: 'ua',
    appid: this.#BASE_KEY,
    };
    requestCity = null

    async fetchWeatherByCity() {
        const baseSearchParams = new URLSearchParams({
            ...this.defaultSearchParams,
            q: this.requestCity,
        });
        const data = axios(`${this.#BASE_URL}?${baseSearchParams}`);
        return data;
    }
}
