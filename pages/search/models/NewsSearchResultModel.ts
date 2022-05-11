export type NewsSearchResultModelData = {
  title: string;
  link: string;
  publicationDate: string;
  section: string;
}

export default class NewsSearchResultModel {
  // non-state, essential data
  data: NewsSearchResultModelData;

  // stateful data

  constructor(data: NewsSearchResultModelData) {
    this.data = data;
  }

  toString(): string {
    return JSON.stringify(
      this.data
    );
  }

  static fromString(s: string): NewsSearchResultModel {
    return new NewsSearchResultModel(JSON.parse(s));
  }
}