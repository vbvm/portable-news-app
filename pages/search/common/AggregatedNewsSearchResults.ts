import NewsSearchResultModel from "../models/NewsSearchResultModel";
import { NewsSearchResultSet } from "./NewsSearchResultSet";

export class AggregatedNewsSearchResults {
    results: Array<NewsSearchResultSet>;
    constructor() {
        this.results = [];
    }

    add(s: NewsSearchResultSet): void {
        this.results.push(s);
    }

    isEmpty(): Boolean {
        var isEmpty: Boolean = true;
        for (var resultSet of this.results)
            isEmpty = isEmpty && resultSet.isEmpty();
        return isEmpty;
    }

    getGroupedBySection(): Record<string, Array<NewsSearchResultModel>> {
        var sections: Record<string, Array<NewsSearchResultModel>> = {};
        for (var i = 0; i < this.results.length; i++) {
            var resultSet: NewsSearchResultSet = this.results[i];
            for (var j = 0; j < resultSet.results.length; j++) {
                var result: NewsSearchResultModel = resultSet.results[j];
                if (!(result.data.section in sections))
                    sections[result.data.section] = [];
                sections[result.data.section].push(result);
            }
        }
        return sections;
    }

    toString(): string {
        var resultsAsString = [];
        for (var i = 0; i < this.results.length; i++) {
            var resultSet: NewsSearchResultSet = this.results[i];
            resultsAsString.push(resultSet.toString());
        }
        return JSON.stringify(
            resultsAsString
        );
    }

    static fromString(s: string): AggregatedNewsSearchResults {
        var arr = JSON.parse(s);
        var resultSet = new AggregatedNewsSearchResults();

        for (var resultAsString of arr) {
            resultSet.results.push(NewsSearchResultSet.fromString(resultAsString));
        }
        return resultSet;
    }
}