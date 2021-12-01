import { TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_CART, UPDATE_CART_IN_FIREBASE, SET_CART_FROM_FIREBASE } from "./cartActionTypes";
import { toggleCartHidden, addItem, clearCart, updateCartItemsInFirebase, setCartFromFirebase } from "./cartActions";

describe("Testing toggleCartHidden action creator", () => {
    it("The toggle cart hidden action creator should create an action object with the appropiate type", () => {
        expect(toggleCartHidden()).toEqual({ type: TOGGLE_CART_HIDDEN });
    })
})

describe("Testing clearCart action creator", () => {
    it("The clear action creator should create an action object with the appropiate type", () => {
        expect(clearCart()).toEqual({ type: CLEAR_CART });
    })
})

describe('Testing addItem action creator', () => {
    it('An addItem action object should be created with the item as the payload', () => {
      const mockItem = {
        id: 1
      };
      const action = addItem(mockItem);
      expect(action.type).toEqual(ADD_ITEM);
      expect(action.payload).toEqual(mockItem);
    });
});

describe('Testing updateCartItemsInFirebase action creator', () => {
    it('An Update cart items in firebase action object should be created', () => {
      expect(updateCartItemsInFirebase()).toEqual({ type: UPDATE_CART_IN_FIREBASE });
    });
});

describe('Testing setCartFromFirebase action creator', () => {
    it('A setCartFromFirebase action object should be created with the item as the payload', () => {
      const mockItems = [ { id: 1 }, { id: 2 }];
      const action = setCartFromFirebase(mockItems);
      expect(action.type).toEqual(SET_CART_FROM_FIREBASE);
      expect(action.payload).toEqual(mockItems);
    });
});