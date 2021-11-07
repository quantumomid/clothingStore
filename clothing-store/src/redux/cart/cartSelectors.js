import { createSelector } from "reselect";

//input selector  - gets the whole state and returns a slice of it (i.e. one layer deep usually)
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity+cartItem.quantity, 0)
);