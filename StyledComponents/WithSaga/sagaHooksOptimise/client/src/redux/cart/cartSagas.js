import { takeLatest, put, all, call } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS } from "../user/userActionTypes";
import { clearCart, setCartFromFirebase } from "./cartActions";
import { getUserCartRef } from "../../firebase/firebase.utils";

export function* clearCartOnSignOut(){
    yield put(clearCart());
}

// This is an example of reusing saga from another slice i.e.
// userSagas here to also perform some logic i.e. clear cart!
export function* onSignOutSuccess(){
    yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

// This is run with respect to the SIGN_IN_SUCCESS action type 
// which comes with the user payload (see user actions JS file)
export function* checkCartFromFirebase({ payload: user }) {
    console.log("user in checkCartFromFirebase Saga", user);
    const cartRef = yield getUserCartRef(user.id);
    console.log("user Ref back from getUserCartRef in checkCartFromFirebase Saga", cartRef);
    const cartSnapshot = yield cartRef.get();
    yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

// Our whole operation begins open successful sign-in > then only 
// will we check the cart items for the user in firebase
export function* onUserSignIn() {
    yield takeLatest(SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess), call(onUserSignIn)]);
}