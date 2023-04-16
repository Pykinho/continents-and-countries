export function getSampleCountries(countries, size) {
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

export function getContinentCode(map, value) {
  for (const k in map) {
    if (map[k].toLowerCase() === value.toLowerCase()) {
      return k;
    }
  }
  return '';
}

export function generateListItems(arr) {
  let items = '';
  for (const x of arr) {
    items += `
      <tr> 
        <td>${x.name ? x.name : noInformation}</td> 
        <td>${x.capital ? x.capital : noInformation}</td>
        <td>${x.subregion ? x.subregion : noInformation}</td>
        <td>${x.population ? x.population : noInformation}</td>
        <td>${x.currencies ? x.currencies : noInformation}</td>
        <td>${x.languages ? x.languages : noInformation}</td>
      </tr>`;
  }
  return items;
}
