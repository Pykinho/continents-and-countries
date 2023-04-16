import {
  continentAlert,
  numberAlert,
  continentError,
  numberError,
} from './config.js';
import { WrongInputError } from './error.js';

export class CountriesApi {
  constructor(continentMap, graphqlUrl, continentName, numCountries, query) {
    this.continentMap = continentMap;
    this.graphqlUrl = graphqlUrl;
    this.continentName = continentName;
    this.numCountries = numCountries;
    this.query = query;
  }

  async getCountries() {
    const continentCode = this.getContinentCode(
      this.continentMap,
      this.continentName
    );

    if (!continentCode) {
      alert(continentAlert + `${Object.values(this.continentMap)}. `);
      throw new WrongInputError(continentError);
    }

    if (
      isNaN(this.numCountries) ||
      this.numCountries < 2 ||
      this.numCountries > 10
    ) {
      alert(numberAlert);
      throw new WrongInputError(numberError);
    }

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: this.query,
        variables: { code: continentCode },
      }),
    });

    const { data } = await response.json();
    const countries = data.continent.countries.map(country => country.name);

    const sampleCountries = this.getSampleCountries(
      countries,
      this.numCountries
    );
    return sampleCountries;
  }

  getContinentCode(map, value) {
    for (const k in map) {
      if (map[k].toLowerCase() === value.toLowerCase()) {
        return k;
      }
    }
    return '';
  }
  getSampleCountries(countries, size) {
    const result = [];
    const used = new Set();

    while (result.length < size) {
      const i = Math.floor(Math.random() * countries.length);
      if (!used.has(i)) {
        used.add(i);
        result.push(countries[i]);
      }
    }
    return result;
  }
}
