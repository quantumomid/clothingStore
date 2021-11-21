import { takeLatest, put, all, call } from "redux-saga/effects";
import { auth, createUserProfileDocument, googleProvider } from "../../firebase/firebase.utils";
import { signInFailure, signInSuccess } from "./userActions";
import { EMAIL_SIGN_IN_START, GOOGLE_SIGN_IN_START } from "./userActionTypes";

// resusable generator helper function to use in google and emailandpassword 
// sign ins!
export function* getSnapshotFromUserAuth(userAuth){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        // console.log(error);
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle(){
    // still need this extra try-catch incase signInWithPopup fails
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        // console.log(error);
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }){
        // still need this extra try-catch incase signInWithEmailAndPassword fails
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail)
}


// Basically instantiating all the other sagas
export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}