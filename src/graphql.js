import {
  continentAlert,
  numberAlert,
  continentError,
  numberError,
} from './config.js';
import { WrongInputError } from './error.js';
import { getContinentCode, getSampleCountries } from './utils.js';

export async function getCountries(
  graphqlUrl,
  continentMap,
  continentName,
  numCountries,
  query
) {
  const continentCode = getContinentCode(continentMap, continentName);

  if (!continentCode) {
    alert(continentAlert + `${Object.values(continentMap)}. `);
    throw new WrongInputError(continentError);
  }

  if (isNaN(numCountries) || numCountries < 2 || numCountries > 10) {
    alert(numberAlert);
    throw new WrongInputError(numberError);
  }

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: { code: continentCode },
    }),
  });

  const { data } = await response.json();
  const countries = data.continent.countries.map(country => country.name);

  const sampleCountries = getSampleCountries(countries, numCountries);
  return sampleCountries;
}
