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

const continentName = prompt('Enter a continent name:');
const continentCode = getContinentCode(continentMap, continentName);

if (!continentCode) {
  alert('Invalid continent name!');
}

const numCountries = parseInt(
  prompt('Enter a number of countries to display (2-10):'),
  10
);

if (isNaN(numCountries) || numCountries < 2 || numCountries > 10) {
  alert('Invalid number of countries!');
}

const graphqlUrl = 'https://countries.trevorblades.com/';

const query = `
  query {
    continent(code: "${continentCode}") {
      countries {
        name
      }
    }
  }
`;

const countries = getCountries();

function getContinentCode(map, value) {
  for (const k in map) {
    if (map[k].toLowerCase() === value.toLowerCase()) {
      return k;
    }
  }
  return '';
}

async function getCountries() {
  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();
  const countries = data.continent.countries.map(country => country.name);
  return countries;
}
