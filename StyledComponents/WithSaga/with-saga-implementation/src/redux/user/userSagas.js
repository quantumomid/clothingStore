import { takeLatest, put, all, call } from "redux-saga/effects";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebase.utils";
import { signInFailure, signInSuccess, signOutSuccess, signOutFailure, registerFailure, registerSuccess } from "./userActions";
import { CHECK_USER_SESSION, EMAIL_SIGN_IN_START, GOOGLE_SIGN_IN_START, REGISTER_START, REGISTER_SUCCESS, SIGN_OUT_START } from "./userActionTypes";


// resusable generator helper function to use in google and emailandpassword 
// sign ins!
export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession(){
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart(){
    yield takeLatest(SIGN_OUT_START, signOut);
}

export function* signInAfterRegister({ payload: { user, additionalData } }){
    // below will also therefore sign in the user after a successful register!
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onRegisterSuccess(){
    yield takeLatest(REGISTER_SUCCESS, signInAfterRegister)
}

export function* register({ payload: { displayName, email, password } }){
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(registerSuccess({ user, additionalData: { displayName } }))
    } catch (error) {
        yield put(registerFailure(error));
    }
}

export function* onRegisterStart(){
    yield takeLatest(REGISTER_START, register);
}

// Basically instantiating all the other sagas
export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onRegisterStart), call(onRegisterSuccess)])
}