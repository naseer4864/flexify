import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword,
GoogleAuthProvider, signInWithEmailAndPassword ,
signInWithRedirect, signOut, onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc, } from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyCaQkptmrn5LUx_H15mcw9tuboPRzHELaM",
    authDomain: "flexify-19736.firebaseapp.com",
    projectId: "flexify-19736",
    storageBucket: "flexify-19736.appspot.com",
    messagingSenderId: "408722555847",
    appId: "1:408722555847:web:89a6bf788a47fefc764fe2"
  };


const app = initializeApp(firebaseConfig);
const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth();
export const createGoogleUserAuth = () => signInWithPopup(auth, GoogleProvider);
export const createGoogleUserAuthEandP = () => signInWithRedirect(auth, GoogleProvider);
export const resetPassWord = (email) => sendPasswordResetEmail(auth, email);

const db = getFirestore();

export const createUserDocRef = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInfo
            })
        } catch (error) {
            console.log("catching error creating user", error.message)
        }
    }

    return userDocRef

}

export const createUserwithEandP = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email, password)
}

export const signInUserwithEandP = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth,email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)