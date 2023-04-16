import { CountriesApi } from './countries.js';
import { CountriesDetailsApi } from './countriesDetails.js';
import { noInformation } from './config.js';

export class ContinentAndCountrySearch {
  constructor(graphqlUrl, query, continentMap, loader, restUrl) {
    this.graphqlUrl = graphqlUrl;
    this.query = query;
    this.continentMap = continentMap;
    this.loader = loader;
    this.restUrl = restUrl;
  }
  search() {
    document.querySelector('.search ').addEventListener('click', async () => {
      const continentName = document.querySelector('.name').value;
      const numCountries = Number(document.querySelector('.amount').value);
      document.querySelector('.result').innerHTML = this.loader;

      try {
        const countriesApi = new CountriesApi(
          this.continentMap,
          this.graphqlUrl,
          continentName,
          numCountries,
          this.query
        );
        const countries = await countriesApi.getCountries();

        const countriesDetailsApi = new CountriesDetailsApi(
          this.restUrl,
          countries
        );
        const countriesDetails = await countriesDetailsApi.getCountryDetails();
        const resultTable = this.generateListItems(countriesDetails);

        document.querySelector('.result').innerHTML = `
      <div style="overflow-x:auto;">
        <table class="styled-table">
          <thead>
            <tr>
                <th>${Object.keys(countriesDetails[0])[0]}</th>
                <th>${Object.keys(countriesDetails[0])[1]}</th>
                <th>${Object.keys(countriesDetails[0])[4]}</th>
                <th>${Object.keys(countriesDetails[0])[2]}</th>
                <th>${Object.keys(countriesDetails[0])[3]}</th>
                <th>${Object.keys(countriesDetails[0])[5]}</th>
            </tr>
          </thead>
          <tbody>
          ${resultTable}
          </tbody>
        </table>
      </div>`;
      } catch (error) {
        document.querySelector('.result').innerHTML = '';
        console.error(error);
      }
    });
  }

  generateListItems(arr) {
    let items = '';
    for (const x of arr) {
      items += `
        <tr> 
          <td>${x.Name ? x.Name : noInformation}</td> 
          <td>${x.Capital ? x.Capital : noInformation}</td>
          <td>${x.Subregion ? x.Subregion : noInformation}</td>
          <td>${x.Population ? x.Population : noInformation}</td>
          <td>${x.Currencies ? x.Currencies : noInformation}</td>
          <td>${x.Languages ? x.Languages : noInformation}</td>
        </tr>`;
    }
    return items;
  }
}
