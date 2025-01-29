import "/src/style.css"
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

export function BookView(props){

    const imgURL =
        props.bookDetails?.docs?.[0]?.isbn?.[0]
            ? `https://covers.openlibrary.org/b/isbn/${props.bookDetails.docs[0].isbn[0]}-M.jpg`
            : null;

    const avgRating = props.bookDetails.docs[0].ratings_average?.toFixed(1) || "No data"

    function detailsToSearch(){
        return window.location.hash="#/search"
    }

    function addBookACB(){
        props.addBookTitle()
        props.addBook()
    }

    function removeBookACB(){
        props.removeBook()
    }

    function inputNotesBoxACB(evt){
        props.onUserInput(evt.target.value);
    }

    function handleChangeRating(selectedValue) {
        props.onUserRating(selectedValue);
        props.onRatingAdd();
    }

    // We didnt finalise this functionality but kept the logic and code in case we ever want to implement it
    function handleColourChange(){
        console.log("clicked blue in view")
        props.onUserChangesColour("blue")
        props.onColourChange()
    }


    return (
        <div className = "detailsBox">
            <div className= "detailsTitle">
                {props.bookDetails.docs[0].title}
                <button className = "bookViewButton" onClick={detailsToSearch}>Back</button>
                
                {!props.titlesOnShelf?.includes(props.bookDetails.docs[0].title) && 
                    (<button className = "bookViewButton" onClick={addBookACB}>
                    Add to Shelf
                    </button>)}
                
                {props.titlesOnShelf?.includes(props.bookDetails.docs[0].title) && (
                    <button className="bookViewButton" onClick={removeBookACB}>
                    Remove From Shelf
                    </button>
                )}
            </div>
            
            <div className = "detailsContent"> 
                <div className = "coverImage"> 
                {!imgURL ? (
                        <div className = "coverNotFound">Cover not found</div>
                    ) : (
                        <img src={imgURL} alt="Book Cover" />
                    )}
                </div>
                <div className = "detailsText">
                    <div> Author: {props.bookDetails.docs[0].author_name[0] || ""} </div>
                    <div> ISBN: {props.bookDetails?.docs?.[0]?.isbn?.[0] || ""} </div>
                    <div> First publish year: {props.bookDetails.docs[0].first_publish_year || ""} </div>
                    <div> Average rating: {avgRating || "No data"} </div>
                    <div> Genre: {bookThemes() || ""} </div>
                    <div>
                        Your Rating:
                        <Rating
                            className="rating"
                            onChange={handleChangeRating}
                            value={props.ratingToBook}
                        />
                        </div>
                        <div> Your notes:  
                            {/* <div className="userNotes">
                                {props.notesToBook}
                            </div> */}
                        <textarea 
                            rows="5"
                            cols="30"      
                            placeholder="Add your notes here!"              
                            onChange = {inputNotesBoxACB}
                        >
                        {props.notesToBook}
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
        
    );

    function isCertainThemeCB(theme){
        return theme == "Fantasy" || 
        theme == "Fiction" || 
        theme == "Science fiction" || 
        theme == "Adventure" || 
        theme == "Young adult fiction" || 
        theme == "History" || 
        theme == "Romance" || 
        theme == "Action" || 
        theme == "Young adult works" || 
        theme == "Mystery" || 
        theme == "Thriller" || 
        theme == "Horror" || 
        theme == "Drama" || 
        theme == "Crime" || 
        theme == "Biography" || 
        theme == "Autobiography" || 
        theme == "Self-help" || 
        theme == "Humour" || 
        theme == "Historical fiction" || 
        theme == "Philosophy" || 
        theme == "Poetry" || 
        theme == "Politics" || 
        theme == "Psychology" || 
        theme == "Spirituality" || 
        theme == "Science" || 
        theme == "Non-fiction" || 
        theme == "Cookbooks" || 
        theme == "Graphic novels" || 
        theme == "Children's literature" || 
        theme == "Travel" || 
        theme == "Religion" || 
        theme == "Fantasy adventure" || 
        theme == "Western" || 
        theme == "Dystopian" || 
        theme == "Urban fantasy" || 
        theme == "Paranormal romance" || 
        theme == "Comedy" || 
        theme == "Coming-of-age"    
    }
    
    function bookThemes(){
        return props.bookDetails.docs[0].subject?.filter(isCertainThemeCB).join(", ") || "No data"
    }

}