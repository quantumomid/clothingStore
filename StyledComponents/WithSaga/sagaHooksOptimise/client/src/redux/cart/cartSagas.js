import { takeLatest, put, all, call, select } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS } from "../user/userActionTypes";
import { clearCart, setCartFromFirebase, updateCartItemsInFirebase } from "./cartActions";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { selectCurrentUser } from '../user/userSelectors';
import { selectCartItems } from './cartSelectors';
import { ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM } from "./cartActionTypes";

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

// update the cart items in firebase as the user adds, removes or 
// clears their cart in the front end to keep firebase cart items 
// and redux ones in sync!
export function* updateCartInFirebase() {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser) {
      try {
        const cartRef = yield getUserCartRef(currentUser.id);
        const cartItems = yield select(selectCartItems);
        yield cartRef.update({ cartItems });
        yield put(updateCartItemsInFirebase());
      } catch (error) {
        console.log(error);
      }
    }
}
  
// We also need to track whenever our cart state in redux changes 
// so we can update our carts in firebase ACCORDINGLY!
export function* onCartChange() {
    yield takeLatest(
      [
        ADD_ITEM,
        REMOVE_ITEM,
        CLEAR_ITEM_FROM_CART
      ],
      updateCartInFirebase
    );
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess), call(onUserSignIn), call(onCartChange)]);
}