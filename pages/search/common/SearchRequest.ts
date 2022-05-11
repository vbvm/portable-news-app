type SearchRequestData = {
    term: string,
}
export class SearchRequest {
    term: string;
    constructor(q: SearchRequestData) {
        this.term = q.term;
    }
};
