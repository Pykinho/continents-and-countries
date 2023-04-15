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

const numCountries = parseInt(
  prompt('Enter a number of countries to display (2-10):'),
  10
);
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

(async () => {
  try {
    const countries = await getCountries(
      graphqlUrl,
      continentMap,
      continentName,
      numCountries,
      query
    );
  } catch (error) {
    console.error(error);
  }
})();

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
    alert('Invalid continent name!');
  }

  if (isNaN(numCountries) || numCountries < 2 || numCountries > 10) {
    alert('Invalid number of countries!');
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
