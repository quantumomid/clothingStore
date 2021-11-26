import { ADD_ITEM, CLEAR_CART, CLEAR_ITEM_FROM_CART, REMOVE_ITEM, TOGGLE_CART_HIDDEN, UPDATE_CART_IN_FIREBASE, SET_CART_FROM_FIREBASE } from "./cartActionTypes";

export const toggleCartHidden = () => {
    return { type: TOGGLE_CART_HIDDEN }
}

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
})

export const clearItemFromCart = item => ({
    type: CLEAR_ITEM_FROM_CART,
    payload: item
});

export const removeItem = item => ({
    type: REMOVE_ITEM,
    payload: item
});

export const clearCart = () => ({
    type: CLEAR_CART
});

// Needs no argument because updating in FIREBASE not our front end i.e. not redux
export const updateCartItemsInFirebase = () => ({
    type: UPDATE_CART_IN_FIREBASE
});

// Now need to pass cart items as we are setting the front end i.e. redux cart items state!
export const setCartFromFirebase = cartItems => ({
    type: SET_CART_FROM_FIREBASE,
    payload: cartItems
});