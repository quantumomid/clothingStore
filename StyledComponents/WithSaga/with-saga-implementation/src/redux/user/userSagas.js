import { takeLatest, put, all, call } from "redux-saga/effects";
import { auth, createUserProfileDocument, googleProvider } from "../../firebase/firebase.utils";
import { googleSignInFailure, googleSignInSuccess } from "./userActions";
import { GOOGLE_SIGN_IN_START } from "./userActionTypes";

export function* signInWithGoogle(){
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        // console.log(user);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        // console.log(error);
        yield put(googleSignInFailure(error));
        
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Basically instantiating all the other sagas
export function* userSagas(){
    yield all([call(onGoogleSignInStart)])
}