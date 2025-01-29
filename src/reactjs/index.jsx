import { createRoot } from "react-dom/client";
import { ReactRoot } from './ReactRoot.jsx';
import { observable, reaction} from "mobx";
import { connectToFirebase, initializeAuthListener } from "../firebaseModel.js";
import { model } from '../shelfModel.js';
import "/src/firebaseModel.js"

const reactiveModel= observable(model);

//initiating the root component
const rootJSX= <ReactRoot model={reactiveModel} />

initializeAuthListener(reactiveModel);

// mount the app in the page DIV with the id "root":
createRoot(document.getElementById("root")).render(rootJSX);

connectToFirebase(reactiveModel, reaction);