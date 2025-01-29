import { initializeApp } from "firebase/app";

/* you will find 2 imports in firebaseModel, add the configuration and instantiate the app and database: */
import {firebaseConfig} from "/src/firebaseConfig.js";
import { getDatabase, ref, set, get } from "firebase/database"; // Import getDatabase, ref, and set

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, getRedirectResult, signInWithRedirect,  signOut } from "firebase/auth";

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();


// function login() {
//     signInWithPopup(auth, provider).catch((error) => {
//         console.error("Login error:", error);
//         alert(`Login failed: ${error.message}`);
//     });}

// function logout() {
//     signOut(auth).catch((error) => {
//         console.error("Logout error:", error);
//         alert(`Logout failed: ${error.message}`);
//     });
// }
let loginName = "";

//HÅRDKODAT ska egentligen vara typ defaulPATH som är tom
let PATH="default";

function initializeAuthListener(model) {

    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            model.user = {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
            };
            loginName = model.user.displayName;
            PATH = `users/${model.user.uid}/sessionInfo`;
        } else {
            model.user = null;
        }
        readFromFirebase(model)
    });
}

// Database section:
function modelToPersistence(model){
    if (!model.savedBooks || !Array.isArray(model.savedBooks)) {
        return { savedBooks: [], currentBook: model.currentBook  };
    }
    return {
        savedBooks: model.savedBooks.map((book) => ({
            key: book.key,
            title: book.title,
            notes: model.allNotes[book.key] || "",
            rating: model.allRatings[book.key] || 0,
            colour: model.allColours[book.key] || "red",
        })),
        currentBook: model.currentBook,
        displayName: loginName,
    };
}

function saveToFirebase(model){
    if (model.ready) {
        const data = modelToPersistence(model)
        set(ref(db, PATH), data)
    }
}

function persistenceToModel(data, model) {
    const savedBooks = data?.savedBooks || [];
    const allNotes = {};
    const allRatings = {};
    const allColours = {};

    // model.notes = data?.notes || ""; // Restore current notes
    // model.rating = data?.rating || 0; // Restore current rating

    model.savedBooks = savedBooks.map((book) => ({
        key: book.key,
        title: book.title,
    }));

    savedBooks.forEach((book) => {
        allNotes[book.key] = book.notes || "";
        allRatings[book.key] = book.rating || 0;
        allColours[book.key] = book.colour || "red";
    });

    model.allNotes = allNotes;
    model.allRatings = allRatings;
    model.allColours = allColours;

    // Populate bookTitles from savedBooks
    model.bookTitles = model.savedBooks.map((book) => book.title);
    // Populate current notes and rating
    
    //model.currentBook = data?.currentBook || null;

    return Promise.resolve();
}


function readFromFirebase(model){
    model.ready = false;

    return get(ref(db, PATH)).then(snapshot => 
        {return persistenceToModel(snapshot.val(), model);
    }).then(() => { model.ready = true;});
}

function connectToFirebase(model, watchFunction){
    
    readFromFirebase(model)
    
    watchFunction(returnACB, changeACB)

    function returnACB(){
        return [model.savedBooks, model.allNotes, model.allRatings, model.currentBook, model.notes, model.rating, model.colour];
    }

    function changeACB(){
        saveToFirebase(model)
    }
    
}

export { app, db, auth, provider, loginName, onAuthStateChanged, signInWithPopup, 
    signInWithRedirect , getRedirectResult,  signOut, initializeAuthListener, 
    connectToFirebase,
    modelToPersistence,
    persistenceToModel,
    saveToFirebase,
    readFromFirebase, };
