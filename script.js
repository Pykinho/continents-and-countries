'use strict';

const continentMap = {
  AF: 'Africa',
  AN: 'Antarctica',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  OC: 'Oceania',
  SA: 'South America',
};

document.querySelector('.search ').addEventListener('click', async () => {
  const continentName = document.querySelector('.name').value;
  const numCountries = Number(document.querySelector('.amount').value);
  document.querySelector('.result').innerHTML = `
  <div>
    <label for="loader" class="labels">Result:</label>
  </div>
    <div id="loader" class="loader"></div>
    `;

  try {
    const countries = await getCountries(
      graphqlUrl,
      continentMap,
      continentName,
      numCountries,
      query
    );
    const countriesDetails = await getCountryDetails(countries);
    document.querySelector('.result').innerHTML = `
    <div">
    <label for="loader" class="labels">Result:</label>
  </div>
    <table id="styled-table" class="styled-table">
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
      ${generateListItems(countriesDetails)};
      </tbody>
    </table>`;
  } catch (error) {
    console.error(error);
  }
});

const graphqlUrl = 'https://countries.trevorblades.com/';

const query = `
  query($code: ID!){
    continent(code: $code) {
      countries {
        name
      }
    }
  }
`;

function getSampleCountries(countries, size) {
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

function getContinentCode(map, value) {
  for (const k in map) {
    if (map[k].toLowerCase() === value.toLowerCase()) {
      return k;
    }
  }
  return '';
}

async function getCountries(
  graphqlUrl,
  continentMap,
  continentName,
  numCountries,
  query
) {
  const continentCode = getContinentCode(continentMap, continentName);

  if (!continentCode) {
    alert(
      `Invalid continent name! Possible names: ${Object.values(continentMap)}. `
    );
    throw new Error('Invalid continent name!');
  }

  if (isNaN(numCountries) || numCountries < 2 || numCountries > 10) {
    alert('Invalid number of countries! Choose numbers between 2 and 10.');
    throw new Error('Invalid number of countries!');
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

async function getCountryDetails(countries) {
  const countryDetails = [];
  for (const country of countries) {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
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
        information: 'No information found',
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

function generateListItems(arr) {
  let items = '';
  for (const x of arr) {
    items += `
    <tr> 
      <td>${x.name}</td> 
      <td>${x.capital}</td>
      <td>${x.subregion}</td>
      <td>${x.population}</td>
      <td>${x.currencies}</td>
      <td>${x.languages}</td>
    </tr>`;
  }
  return items;
}
