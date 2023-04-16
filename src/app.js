import { continentMap, loader, query, graphqlUrl } from './config.js';

import { getCountries } from './graphql.js';
import { getCountryDetails } from './rest.js';
import { generateListItems } from './utils.js';

('use strict');

document.querySelector('.search ').addEventListener('click', async () => {
  const continentName = document.querySelector('.name').value;
  const numCountries = Number(document.querySelector('.amount').value);
  document.querySelector('.result').innerHTML = loader;

  try {
    const countries = await getCountries(
      graphqlUrl,
      continentMap,
      continentName,
      numCountries,
      query
    );
    const countriesDetails = await getCountryDetails(countries);
    const resultTable = generateListItems(countriesDetails);
    document.querySelector('.result').innerHTML = `
    <div style="overflow-x:auto;">
      <table class="styled-table">
        <thead>
          <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Subregion</th>
              <th>Population</th>
              <th>Currencies</th>
              <th>Languages</th>
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
