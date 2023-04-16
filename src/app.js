import { continentMap, query, loader, graphqlUrl, restUrl } from './config.js';
import { ContinentAndCountrySearch } from './ContinentAndCountrySearch.js';

const continentAndCountrySearch = new ContinentAndCountrySearch(
  graphqlUrl,
  query,
  continentMap,
  loader,
  restUrl
);
continentAndCountrySearch.search();
