import { restUrl } from './config.js';

export async function getCountryDetails(countries) {
  const countryDetails = [];
  for (const country of countries) {
    const response = await fetch(restUrl + `${encodeURIComponent(country)}`);
    const data = await response.json();
    const countryData = data[0];
    const languageNames = [];
    const currencyNames = [];

    if (countryData) {
      const { name, capital, population, currencies, subregion, languages } =
        countryData;
      const officialName = name.official;
      for (const currency of Object.values(currencies)) {
        currencyNames.push(currency.name);
      }

      for (const language of Object.values(languages)) {
        languageNames.push(language);
      }
      countryDetails.push({
        name: officialName,
        capital,
        population,
        currencies: currencyNames,
        subregion,
        languages: languageNames,
      });
    } else {
      countryDetails.push({
        name: country,
        information: noInformation,
      });
    }
  }
  countryDetails.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return countryDetails;
}
