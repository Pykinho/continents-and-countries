export class CountriesDetailsApi {
  constructor(restUrl, countries) {
    this.restUrl = restUrl;
    this.countries = countries;
  }
  async getCountryDetails() {
    const countryDetails = [];
    for (const country of this.countries) {
      const response = await fetch(
        this.restUrl + `${encodeURIComponent(country)}`
      );
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
          Name: officialName,
          Capital: capital,
          Population: population,
          Currencies: currencyNames,
          Subregion: subregion,
          Languages: languageNames,
        });
      } else {
        countryDetails.push({
          Name: country,
        });
      }
    }
    countryDetails.sort((a, b) => {
      if (a.Name < b.Name) {
        return -1;
      }
      if (a.Name > b.Name) {
        return 1;
      }
      return 0;
    });

    return countryDetails;
  }
}
