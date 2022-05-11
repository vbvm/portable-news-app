import NewsSearchResultModel from "../models/NewsSearchResultModel";
import { NewsSearchResultSet } from "./NewsSearchResultSet";
import { SearchRequest } from "./SearchRequest";

export interface INewsSource {
    getSearchResults(request: SearchRequest): Promise<NewsSearchResultSet>
}