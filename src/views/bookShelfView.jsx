import "/src/style.css"
import { useState, useEffect } from "react";

export function BookShelfView(props){

    //This useState and useEffect is used for dynamically adapting for a changing window size
    //We realise that CSS probably could have been used to achieve the effect of books falling down
    //onto new shelves that are created dynamically, but this is how we implemented it and it
    //works great. We gave CSS a shot but there were some problems with displaying shelves that are only
    //as long as needed, which is not what we want. We want entire shelves, even if they are nearly empty
    const [booksPerRow, setBooksPerRow] = useState(getBooksPerRow());

    useEffect(() => {
        const handleResize = () => {
        setBooksPerRow(getBooksPerRow());
        };

        window.addEventListener("resize", handleResize);

        return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, []);

    function truncateTitle(title, maxLength) {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + "...";
        }
        return title;
    }
    
    function getBooksPerRow() {
        const width = window.innerWidth;
    
        if (width < 300) {
            return 1;
        }
        return Math.floor((width - 300) / 75) + 2;
    }

    function clickedBookInShelfACB(index){
        let key = props.getKey(index)
        props.onSeeBookDetails(key)
        return window.location.hash="#/details"
    }

    function displayBooksAndShelves() {
        const numRows = Math.ceil(props.getTitlesLength / booksPerRow);
        const booksAndShelves = [];
        

        if (!props.getTitlesLength){
            booksAndShelves.push(
                <div>
                    <div className="shelfTop"></div>
                    <div className="shelfEdge"></div>
                    <div className="emptyShelf">This is your first bookshelf! Search for the book you want and click "Add to Shelf"</div>
                </div>
            )
        }

        for (let row = 0; row < numRows; row++) {
            const booksRow = [];
            for (let i = row*booksPerRow; i < (row + 1) * booksPerRow && i < props.getTitlesLength; i++){
                booksRow.push(
                    <div
                        key = {i}
                        className = "book"
                        onClick={function () {
                            return clickedBookInShelfACB(i);
                        }}
                    >
                        {truncateTitle(props.getTitles[i], 45)}
                    </div>
                )
            }

            booksAndShelves.push(
                <div key={"shelf"+row}>
                    <div className="shelfTop">{booksRow}</div>
                    <div className="shelfEdge"></div>
                </div>
            )
        }
        
        return booksAndShelves;
    }

    return (<div>{displayBooksAndShelves()}</div>)
}