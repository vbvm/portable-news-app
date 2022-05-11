import NewsSearchResultModel from "../search/models/NewsSearchResultModel";

export class BookmarkManager {
    bookmarks: Record<string, NewsSearchResultModel>;
    constructor() {
        this.bookmarks = {};
    }

    addBookmark(sr: NewsSearchResultModel) {
        this.bookmarks[sr.getUniqueId()] = sr;
        this.save();
    }

    removeBookmark(sr: NewsSearchResultModel) {
        delete this.bookmarks[sr.getUniqueId()];
        this.save();
    }

    save() {
        var s = this.toString();
        localStorage.setItem('bookmarks', s);
    }

    static load() {
        var s = localStorage.getItem('bookmarks');
        if (s == null) return new BookmarkManager();
        s = s as string;
        return BookmarkManager.fromString(s);
    }

    isEmpty() : Boolean {
        return Object.keys(this.bookmarks).length == 0;
    }

    toString(): string {
        var bookmarksAsString: Record<string, string> = {};
        for (let key in this.bookmarks) {
            bookmarksAsString[key] = this.bookmarks[key].toString();
        }
        return JSON.stringify(
            bookmarksAsString
        );
    }

    static fromString(s: string): BookmarkManager {
        var bookmarksAsObject: Record<string, NewsSearchResultModel> = {};
        var bookmarksAsString: Record<string, string> = JSON.parse(s);
        
        
        for (let key in bookmarksAsString) {
            bookmarksAsObject[key] = NewsSearchResultModel.fromString(bookmarksAsString[key]);
        }

        var o = new BookmarkManager();
        o.bookmarks = bookmarksAsObject;
        return o;
    }
};
