export const continentMap = {
  AF: 'Africa',
  AN: 'Antarctica',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  OC: 'Oceania',
  SA: 'South America',
};
export const loader = `<div id="loader" class="loader"></div>`;

export const query = `
  query($code: ID!){
    continent(code: $code) {
      countries {
        name
      }
    }
  }
`;

export const graphqlUrl = 'https://countries.trevorblades.com/';
export const numberAlert =
  'Invalid number of countries! Choose numbers between 2 and 10.';
export const continentAlert = 'Invalid continent name! Possible names: ';
export const noInformation = 'No information found';
export const continentError = 'Invalid continent name!';
export const numberError = 'Invalid number of countries!';
export const restUrl = 'https://restcountries.com/v3.1/name/';
