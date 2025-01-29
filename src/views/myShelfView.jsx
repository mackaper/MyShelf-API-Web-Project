

export function MyShelfView(props) {

  function showHelpACB(){
    props.showHelp();
    
  }
  function logout(){
    props.handleAuthButtonClick();
  }

  function closeHelpACB() {
    props.closeHelp();
  }

  function clickedOnMyShelf(){
    return window.location.hash="#/search"
  }

    return (
      <div>
        <span className= "MyShelf" onClick={clickedOnMyShelf}>
          MyShelf
          <button className="logout-btn" onClick={logout}>Log out</button>
        </span>
        <div>
          Welcome, {props.loginName}
        </div>
        
        <button className = "help-button" onClick={showHelpACB}>Help</button>

        {props.isHelpVisible && (
        <div className="modal">
          <div className="modal-content">
              <span className="close-btn" onClick={closeHelpACB}>&times;</span>
              <h2>Help</h2>
              <p>Welcome to MyShelf! This is how to get started:</p>
              <ul>
                  <li>Search for a book in the search bar</li>
                  <li>Add, rate or make notes to the book of your choice</li>
                  <li>Collect your books in your very own virtual bookshelf!</li>
              </ul>
          </div>
        </div>)}
      </div>
    );
  }