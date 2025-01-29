import { BookView } from "../views/bookView.jsx";
import { LoadingView } from "../views/loadingView.jsx";
import { BookLoadingView } from "../views/bookLoadingView.jsx";
import { observer } from "mobx-react-lite";
import { utilities } from "../utilities.js";

export const Book = observer(
    function BookRender(props){      
        
        if (!props.model.currentBook) {
            utilities.initializeModel(props.model);
        }

        if (props.model.currentBook) {
            utilities.saveCurrentBook(props.model);
        }
        
        function setNotesACB(theNotes){
            props.model.setNotes(theNotes)
            // saveToFirebase(props.model);
        }
        
        function addNotesNowACB(){
            props.model.addNoteToBook()
            // saveToFirebase(props.model);
        }

        function userRatesACB(rating){
            props.model.setRating(rating)
            // saveToFirebase(props.model);
        }

        function addRatingNowACB(){
            props.model.addRatingToBook()
            // saveToFirebase(props.model);
        }

        function userChangesColourACB(bookColour){
            props.model.setBookColour(bookColour)
            // saveToFirebase(props.model);
        }

        function changeBookColourACB(){
            props.model.addColourToBook()
            // saveToFirebase(props.model)
        }

        function determineTheRender(state){

            if (state.promise && 
                !state.data &&
                !state.error
            ){
                return <div><BookLoadingView/></div>
            }
            if (state.promise && 
                state.data &&
                !state.error
            ){
                function userAddsBookTitle(){
                    props.model.addBookTitleToShelf(state.data.docs[0].title)
                }
                function userAddsBook(){
                    props.model.addBookToShelf(state.data.docs[0])
                }

                function userRemovesBook(){
                    props.model.removeBookFromShelf(state.data.docs[0], state.data.docs[0].title)
                }

                
                
                return <BookView
                    bookDetails = {state.data || []}
                    addBookTitle = {userAddsBookTitle}
                    title = {state.data.docs[0].title}
                    addBook = {userAddsBook}
                    removeBook = {userRemovesBook}
                    titlesOnShelf = {props.model.getBookTitles()}
                    

                    notesToBook = {props.model.getBookNotes()}
                    onUserInput = {setNotesACB}
                    onNotesAdd = {addNotesNowACB}

                    ratingToBook = {props.model.getBookRating()}
                    onUserRating = {userRatesACB}
                    onRatingAdd = {addRatingNowACB}

                    bookColour = {props.model.getBookColour()}
                    onUserChangesColour = {userChangesColourACB}
                    onColourChange = {changeBookColourACB}
                />
            }
            if (state.promise && 
                !state.data &&
                state.error
            ){
                return <div>{state.error}</div>
            }
            if (!state.promise && 
                !state.data &&
                !state.error
            ){
                return "No data"
            }
    
        }


        return <div>
        {determineTheRender(props.model.currentBookPromiseState)}
        </div>
    }
)