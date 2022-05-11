import NewsSearchResultModel from "../models/NewsSearchResultModel";

type Status = {
    ok: Boolean;
    errorMsg: string;
}

export class NewsSearchResultSet {
    status: Status;
    results: Array<NewsSearchResultModel>;
    constructor() {
        this.results = [];
        this.status = {
            ok: true, errorMsg: ''
        };
    }

    push(r: NewsSearchResultModel): void {
        this.results.push(r);
    }
    merge(s: NewsSearchResultSet): void {
        this.results = this.results.concat(s.results);
    }

    toString(): string {
        var resultsAsString = [];
        for (var i = 0; i < this.results.length; i++) {
            var result: NewsSearchResultModel = this.results[i];
            resultsAsString.push(result.toString());
        }
        return JSON.stringify(
            resultsAsString
        );
    }

    isEmpty(): Boolean {
        return this.results.length == 0;
    }

    getGroupedBySection() :Record<string, Array<NewsSearchResultModel>> {
        var sections: Record<string, Array<NewsSearchResultModel>> = {};
        for (var i = 0; i < this.results.length; i++) {
            var result: NewsSearchResultModel = this.results[i];
            if (!(result.data.section in sections))
                sections[result.data.section] = [];
            sections[result.data.section].push(result);
        }
        return sections;
    }

    static fromString(s: string): NewsSearchResultSet {
        var arr = JSON.parse(s);
        var resultSet = new NewsSearchResultSet();

        for (var resultAsString of arr) {
            resultSet.results.push(NewsSearchResultModel.fromString(resultAsString));
        }
        return resultSet;
    }
}