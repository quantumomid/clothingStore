import { takeLatest, put, all, call } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS } from "../user/userActionTypes";
import { clearCart } from "./cartActions";

export function* clearCartOnSignOut(){
    yield put(clearCart());
}

// This is an example of reusing saga from another slice i.e.
// userSagas here to also perform some logic i.e. clear cart!
export function* onSignOutSuccess(){
    yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess)]);
}