import { INewsSource } from "../common/INewsSource";
import { NewsSearchResultSet } from "../common/NewsSearchResultSet";
import { SearchRequest } from "../common/SearchRequest";
import NewsSearchResultModel from "../models/NewsSearchResultModel";

type GuardianSearchResult = {
  id: string;
  sectionName: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
}

export class GuardianNewsSource implements INewsSource {
  static SourceName = 'GUARDIAN';
  async getSearchResults(request: SearchRequest): Promise<NewsSearchResultSet> {
    const response = await fetch(
      'https://content.guardianapis.com/search?q=' + encodeURIComponent(request.term) + '&api-key=test',
      {
        method: 'GET'
      }
    );
    const responseJson = await response.json();
    var results: NewsSearchResultSet = new NewsSearchResultSet();
    for (var result of responseJson.response.results) {
      results.push(this.parseResult(result));
    }

    return results;
  }

  parseResult(rObj: GuardianSearchResult): NewsSearchResultModel {
    return new NewsSearchResultModel({
      id: rObj.id,
      section: rObj.sectionName,
      title: rObj.webTitle,
      link: rObj.webUrl,
      publicationDate: rObj.webPublicationDate,
      source: GuardianNewsSource.SourceName
    });
  }
}