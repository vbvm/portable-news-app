import { AggregatedNewsSearchResults } from "./common/AggregatedNewsSearchResults";
import { INewsSource } from "./common/INewsSource";
import { NewsSearchResultSet } from "./common/NewsSearchResultSet";
import { SearchRequest } from "./common/SearchRequest";
import NewsSearchResultModel from "./models/NewsSearchResultModel";

export type SearchManagerSettings = {
  lastTerm: string;
}

export default class SearchManager {
  static DEFAULT_SETTINGS: SearchManagerSettings = {
    lastTerm: ''
  };

  newsSources: Record<string, INewsSource>;
  settings: SearchManagerSettings;

  constructor(settings: SearchManagerSettings = SearchManager.DEFAULT_SETTINGS) {
    this.newsSources = {};
    this.settings = settings;
  }

  addSource(key: string, source: INewsSource) {
    this.newsSources[key] = source;
    return this;
  }

  removeSource(key: string) {
    if (key in this.newsSources)
      delete this.newsSources[key];
    return this;
  }

  async getSearchResults(request: SearchRequest): Promise<AggregatedNewsSearchResults> {
    var resultsFromAllSources: AggregatedNewsSearchResults = new AggregatedNewsSearchResults();
    for (let key in this.newsSources) {
      var source: INewsSource = this.newsSources[key];
      var results: NewsSearchResultSet = await source.getSearchResults(request);
      resultsFromAllSources.add(results);
    }
    return resultsFromAllSources;
  }

  toString(): string {
    return JSON.stringify(
      this.settings
    );
  }

  fromString(s: string): SearchManager {
    return new SearchManager(JSON.parse(s));
  }
}