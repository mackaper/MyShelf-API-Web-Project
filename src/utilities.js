export const utilities = {
    initializeModel(model) {
        const savedCurrentBook = localStorage.getItem("currentBook");
        if (savedCurrentBook) {
            model.setCurrentBook(savedCurrentBook);
        }
    },

    saveCurrentBook(model) {
        if (model.currentBook) {
            localStorage.setItem("currentBook", model.currentBook);
        }
    },
};