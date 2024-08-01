import { initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvomoEd6SuTzO_jrOADy7yb5V9ihGOQ94",
  authDomain: "taskmanagerapp-ab26c.firebaseapp.com",
  projectId: "taskmanagerapp-ab26c",
  storageBucket: "taskmanagerapp-ab26c.appspot.com",
  messagingSenderId: "200734488443",
  appId: "1:200734488443:web:694bf5429de4944fa56fde"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:'select_account',
})
export const auth = getAuth(app);
export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);