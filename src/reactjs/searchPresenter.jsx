import { BookShelfView } from "../views/bookShelfView.jsx";
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { LoadingView } from "../views/loadingView.jsx";
import { observer } from "mobx-react-lite";

export const Search = observer(
    function SearchRender(props){
        
        function setSearchTextACB(theSearchQuery){
            props.model.setSearchQuery(theSearchQuery)
        }

        function searchNowACB(){
            props.model.doSearch(props.model.searchParams.query)
        }


        function determineTheRender(state){

            if (!props.model.showSearchResults) {
                return null; // Hide results when `showSearchResults` is false
            }

            if (state.promise && 
                !state.data &&
                !state.error
            ){
                return <div><LoadingView/></div>
                //<img className="loadingImage" src="https://media.giphy.com/media/WGOaDgpnLdfPSpwm69/giphy.gif?cid=ecf05e47auzwz515tn5wxhxvonca6k0isa8yhfj7h9hbjsvs&ep=v1_stickers_search&rid=giphy.gif&ct=ts" />;
            }

            if (state.promise && 
                state.data &&
                !state.error
            ){

                function seeBookDetailsACB(key){
                    props.model.setCurrentBook(key)
                }

                function hideSearchResultsACB(){
                    props.model.hideSearchResults()
                }

                return <SearchResultsView
                    searchResults = {state.data || []}
                    onSeeBookDetails = {seeBookDetailsACB}
                    hideSearchResults = {hideSearchResultsACB}
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
                return null;
            }
        }

        function getTitlesACB(){
            return props.model.getBookTitles()
        }

        function getTitlesLengthACB(){
            return props.model.getBookTitlesLength()
        }

        /* function handleClickOutsideACB(event) {
            const resultsContainer = document.querySelector(".searchResultsContainer");
            if (resultsContainer && !resultsContainer.contains(event.target)) {
                props.model.hideSearchResults();
            }
        }

        useEffect(function addClickListener() {
            document.addEventListener("mousedown", handleClickOutsideACB);
            return function removeClickListener() {
                document.removeEventListener("mousedown", handleClickOutsideACB);
            };
        }, []); */

        function seeBookDetailsACB(key){
            props.model.setCurrentBook(key)
        }

        function getKeyACB(index){
            return props.model.getBookKey(index)
        }
        
        return  <div>
                    <SearchFormView 
                    text = {props.model.searchParams.query}
                    onUserInput = {setSearchTextACB}
                    onBookSearch = {searchNowACB}
                    />
                    <div className = "searchResultsContainer">
                    {determineTheRender(props.model.searchResultsPromiseState)}
                    </div>
                    <BookShelfView 
                    savedBooks={props.model.savedBooks}
                    getKey = {getKeyACB}
                    getTitles = {getTitlesACB()} 
                    getTitlesLength = {getTitlesLengthACB()}
                    onSeeBookDetails = {seeBookDetailsACB}/> 
                </div>
    }
)