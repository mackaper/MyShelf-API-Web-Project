import { resolvePromise } from "/src/resolvePromise.js";
import { searchBooks } from "/src/bookSource.js";

export const model = {
    searchParams: {},
    searchResults: {},
    searchResultsPromiseState: {},
    currentBook: null,
    currentBookPromiseState: {},
    bookTitles: [],
    showSearchResults: false,
    savedBooks: [],
    notes: {},
    allNotes: [],
    rating: {},
    allRatings: [],
    colour: {},
    allColours: [],
    isHelpVisible: false,

    userOpensHelp() {
        this.isHelpVisible = true;
    },

    userClosesHelp() {
        this.isHelpVisible = false;
    },

    addBookTitleToShelf(title){
        if (!this.bookTitles.includes(title)) {
            this.bookTitles = [...this.bookTitles, title];
        }
    },

    addBookToShelf(details){
        if (!this.savedBooks.includes(details)) {   
            this.savedBooks = [...this.savedBooks, details]
        }
    },

    removeBookFromShelf(details, title){
        if (this.bookTitles.includes(title)) {
            this.bookTitles = this.bookTitles.filter((book) => book !== title)
        }
            this.savedBooks = this.savedBooks.filter((book) => book.key !== details.key)
    },

    addNoteToBook(){
        const key = this.currentBook;
        this.allNotes[key] = this.notes; 
    },

    getBookNotes(){
        const key = this.currentBook;
        return this.allNotes[key]
    },

    setNotes(noteAdded) {
        this.notes = noteAdded; // Temporarily store the notes
        const key = this.currentBook;
        if (key) {
            this.allNotes[key] = noteAdded; // Sync with allNotes
        }
    },

    addRatingToBook(){
        const key = this.currentBook;
        this.allRatings[key] = this.rating;
    },

    getBookRating(){
        const key = this.currentBook;
        return this.allRatings[key]
    },

    setRating(ratingAdded){
        this.rating = ratingAdded;
        const key = this.currentBook;
        if (key) {
            this.allRatings[key] = ratingAdded; // Sync with allRatings
        }
        
    },

    getBookTitles(){
        return this.bookTitles
    },

    getBookTitlesLength(){
        return this.bookTitles.length
    },

    getBookKey(index){
        return this.savedBooks[index].key
    },

    // getLoginName(){
    //     return loginName
    // },

    getCurrentIndex(key){
        return this.savedBooks.findIndex(book => book.key === key);
    },

    setSearchQuery(query){
        this.searchParams.query = query;
    },

    doSearch(params){
        resolvePromise(searchBooks(params), this.searchResultsPromiseState);
        this.showSearchResults = true;
    },

    hideSearchResults() {
        this.showSearchResults = false; 
    },

    // login,
    // logout,

    setCurrentBook(key) {
        if (key && this.currentBook !== key) {
            this.currentBook = key;
            localStorage.setItem("currentBook", key); // save in localStorage
            resolvePromise(searchBooks(this.currentBook), this.currentBookPromiseState);
        }
    },

    fetchCurrentBookDetails() {
        if (this.currentBook) {
            resolvePromise(searchBooks(this.currentBook), this.currentBookPromiseState);
        }
    },

    initializeCurrentBook() {
        const savedCurrentBook = localStorage.getItem("currentBook");
        if (savedCurrentBook) {
            this.setCurrentBook(savedCurrentBook);
        }
    },

    addColourToBook(){
        const key = this.currentBook;
        this.allColours[key] = this.colour;
    },

    getBookColour() {
        const key = this.currentBook;
        return this.allColours[key] || "red";
    },

    setBookColour(bookColour) {
        this.colour = bookColour
    },
};
