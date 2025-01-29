# MyShelf

[Website Preview](https://myshelf-57099.web.app/)


### Description
MyShelf is a dynamic web application that allows users to manage their personal book collections effortlessly, which much more engaging visuals than a simple list. Users can add books from an external API, and enhance the experience with ratings and comments.


### What We Have Done:
- Set up the React project structure.
- Integrated initial API functionality (e.g., Open Library API) to fetch book data (Title, ISBN, Author, cover etc)
- Created components for displaying and organizing books (our book shelf)
- Implemented user authentication (via Firebase) and a basic login flow
- Improved the UI/UX, including a more polished design and responsive layout.
- Added the ability to rate and comment on books
- Implemented persistence of user data (saving user-specific shelves and ratings/ notes).
- Added error handling and loading states for API calls.

## File Structure:
### **/reactjs Directory**
- **`bookPresenter.jsx`**  
  Handles the logic for displaying and managing individual book data as well as loading images. Links the `bookView` with the `shelfModel`.

- **`index.jsx`**  
  The entry point of the React application. Initializes and renders the root component (`ReactRoot`).

- **`loginPresenter.jsx`**  
  Handles the user login/logout logic. Connects with the `firebaseModel` for authentication and passes data to the `loginView`, checks the loginstate do determine what to views to show next.

- **`myShelfPresenter.jsx`**  
  The main presenter for managing the bookshelf and interacting with the `shelfModel`. Passes data to the `myShelfView`.

- **`ReactRoot.jsx`**  
  The root component that orchestrates which parts of the app to render based on the state (e.g., login vs. bookshelf view).

- **`searchPresenter.jsx`**  
  Manages the logic for searching books using external APIs and adding them to the user's collection. Passes search results to the `searchResultsView`.

---

### **/views Directory**
- **`bookShelfView.jsx`**  
  Displays the user's bookshelf, including all added books. Receives data from the `myShelfPresenter`.

- **`bookView.jsx`**  
  Displays details of an individual book (e.g., title, author, cover, rating). Can be navigated to either by clicking on a book on the shelf or by clicking on a search result

- **`loadingView.jsx` and `bookLoadingView.jsx`**  
  A simple view to indicate loading states (e.g., while fetching data from APIs). This is enhanched with some fancy styling.

- **`loginView.jsx`**  
  Renders the user login interface with google. Displays login button.

- **`myShelfView.jsx`**  
  The main view for the top of the web app. Also says "Welcome " + Account display name.

- **`searchFormView.jsx`**  
  Provides the user interface for entering search queries (e.g., input fields and a search button).

- **`searchResultsView.jsx`**  
  Displays the results of a book search. Integrates with the `searchPresenter`. This is the search drop down view.

---

### **Other Files**
- **`bookSource.js`**  
  Contains functions for fetching book data from external APIs (Open-library)

- **`firebaseConfig.js`**  
  Holds the Firebase configuration details (e.g., API keys, project IDs) for authentication and data management.

- **`firebaseModel.js`**  
  Manages Firebase-related operations, including login and authentication state management.

- **`loadingStyle.css`**  
  Provides styling for the loading component

- **`resolvePromise.js`**  
  A utility function for handling and resolving asynchronous operations, ensuring consistent state management.

- **`shelfModel.js`**  
  The core application model that handles data logic, including book collections, user data, and state.

- **`style.css`**  
  The global stylesheet for the application, defining common styles across all components.

- **`utilities.js`**  
  Contains reusable utility functions, helper functions.

## The 3rd party component:
The group integrated the Rating component from @smastrom/react-rating into BookView. The user can press a star which results in a rating of the book between 1 and 5. This information is saved and later accessible by the user as he or she clicks the rated book. It connects to the app’s state through handleChangeRating, which updates the user’s rating using props.onUserRating and triggers additional logic with props.onRatingAdd. The value prop ensures the UI stays synced with the saved rating.

