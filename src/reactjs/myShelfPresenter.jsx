import { MyShelfView } from "../views/myShelfView.jsx";
import { observer } from "mobx-react-lite";
import { loginName, auth, provider  } from "../firebaseModel.js";
import { signInWithPopup,  signOut } from "firebase/auth";

const Shelf = observer(function ShelfRender(props) {

    const user = auth.currentUser

    // function login() {
    // signInWithPopup(auth, provider).catch((error) => {
    //     console.error("Login error:", error);
    //     alert(`Login failed: ${error.message}`);
    // });}

  function logout() {
    signOut(auth).catch((error) => {
        console.error("Logout error:", error);
        alert(`Logout failed: ${error.message}`);
    });
}

    function handleAuthButtonClick() {
        if (user) {
            logout();
        } else {
            //login();    
        }
    }
    
    function getLoginNameACB(){
        return props.model.getLoginName()
    }

    function userLogsOutACB(){
    }

    function showHelpACB(){
        props.model.userOpensHelp()
    }

    function closeHelpACB(){
        props.model.userClosesHelp()
    }
    
    return <MyShelfView 
    userName = {getLoginNameACB} 
    userLogsOut1 = {userLogsOutACB}
    showHelp = {showHelpACB}
    closeHelp = {closeHelpACB}
    isHelpVisible = {props.model.isHelpVisible}
    loginName = {loginName}
    handleAuthButtonClick = {handleAuthButtonClick}
    />;
});

export { Shelf };
