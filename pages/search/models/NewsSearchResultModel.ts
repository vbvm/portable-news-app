export type NewsSearchResultModelData = {
  id: string;
  title: string;
  link: string;
  publicationDate: string;
  section: string;
  source: string;
}

export default class NewsSearchResultModel {
  // non-state, essential data
  data: NewsSearchResultModelData;

  // stateful data

  constructor(data: NewsSearchResultModelData) {
    this.data = data;
  }

  getUniqueId() : string { return this.data.source + '_' + this.data.id; }

  toString(): string {
    return JSON.stringify(
      this.data
    );
  }

  static fromString(s: string): NewsSearchResultModel {
    return new NewsSearchResultModel(JSON.parse(s));
  }
}