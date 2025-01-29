import "/src/style.css"
export function SearchResultsView(props){

    function handleClickOutsideACB(event) {
        const searchInput = document.querySelector(".searchInput");
        const resultsContainer = document.querySelector(".searchResultsContainer");

        // Check if the click is outside both the search box and the results container
        if (
            searchInput &&
            resultsContainer &&
            !searchInput.contains(event.target) &&
            !resultsContainer.contains(event.target)
        ) {
            props.hideSearchResults();
        }
    }
    
    // Add the click listener at the document level
    document.addEventListener("mousedown", handleClickOutsideACB);

    return (
        <div className = "searchResultsContainer">
              <table className="searchResults">
              <tbody>
                  {  
                    props.searchResults.numFound 
                    ? props.searchResults.docs.slice(0, 10).map(searchResultsDropCB) 
                    : <div>No Results</div>
                  }
                </tbody>
              </table>
        </div>
    );

    function searchResultsDropCB(res){

      function clickedResultACB(){
        props.onSeeBookDetails(res.key)
        return window.location.hash="#/details"
    }

        return <tr key={res.key} className = "resultRow" onClick = {clickedResultACB}>
                <td>{res.title}</td>
                <td className = "alignRight">{res.author_name?.[0] || "Unknown Author"}</td>
             </tr>;
      }   
}