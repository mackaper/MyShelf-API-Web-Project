import { LoginView } from "../views/loginView.jsx";
import { observer } from "mobx-react-lite";
import { signInWithPopup,  signOut } from "firebase/auth";
import { auth, provider } from "../firebaseModel.js";


const Login = observer(function LoginRender(props) {
  const user = auth.currentUser

  
  function login() {
    signInWithPopup(auth, provider).catch((error) => {
        console.error("Login error:", error);
        alert(`Login failed: ${error.message}`);
    });}

  function logout() {
    signOut(auth).catch((error) => {
        console.error("Logout error:", error);
        alert(`Logout failed: ${error.message}`);
    });
  }

  function handleAuthButtonClick() {
    if (user) {
        logout();
    }
    else {
        login();    
    }
  }

  // Determine the authentication state
  let authState; // 'loading', 'notLoggedIn', 'loggedIn'

  if (user === undefined) {
    authState = 'loading';
  } else if (user === null) {
    authState = 'notLoggedIn';
  } else {
    authState = 'loggedIn';
  }

  // Prepare data to pass to the view
  const viewProps = {
    authState: authState,
    user: user,
    onAuthButtonClick: handleAuthButtonClick,
  };

  // Return the view component with prepared data
  return <LoginView {...viewProps} />;
});

export { Login };
