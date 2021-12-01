import { ADD_ITEM, CLEAR_CART, CLEAR_ITEM_FROM_CART, REMOVE_ITEM, SET_CART_FROM_FIREBASE, TOGGLE_CART_HIDDEN } from "./cartActionTypes";
import cartReducer from "./cartReducer";

const initialState ={
    hidden: true,
    cartItems: []
};

describe("Cart Reducer", () => {
    it("The reducer should return the initial state if no state passed as first argument", () => {
        expect(cartReducer(undefined, {})).toEqual(initialState);
    })

    it('Should Toggle the hidden to false when toggle cart hidden action is passed with initial state', () => {
        expect(
          cartReducer(initialState, {
            type: TOGGLE_CART_HIDDEN
          }).hidden
        ).toBe(false);
    });

    it('Should add new item', () => {
        const mockItem = { id: 1 };
        expect(
          cartReducer(initialState, {
            type: ADD_ITEM,
            payload: mockItem
          })
        ).toEqual({
          ...initialState,
          cartItems: [{ ...mockItem, quantity: 1 }]
        });
    })

    it('Cart items empty when clear cart action is dispatched', () => {
        expect(
          cartReducer(initialState, {
            type: CLEAR_CART
          }).cartItems
        ).toEqual([]);
    });

    it('Should REMOVE item if quantity is 1 and remove is called on it', () => {
        const mockInitialState = {
            ...initialState,
            cartItems: [{ id: 1, quantity: 1 }, {id: 2, quantity: 1}]
        };
        const mockItemToRemove = { id: 1 };
        expect(
          cartReducer(mockInitialState, {
            type: REMOVE_ITEM,
            payload: mockItemToRemove
          })
        ).toEqual({
            ...mockInitialState,
            cartItems: [{id: 2, quantity: 1}]
        });
    })

    it('Should REMOVE item if clear cart called regardless of quantity', () => {
        const mockInitialState = {
            ...initialState,
            cartItems: [{ id: 1, quantity: 5 }, {id: 2, quantity: 1}]
        };
        const mockItemToRemove = { id: 1 };
        expect(
          cartReducer(mockInitialState, {
            type: CLEAR_ITEM_FROM_CART,
            payload: mockItemToRemove
          })
        ).toEqual({
            ...mockInitialState,
            cartItems: [{id: 2, quantity: 1}]
        });
    })

    
    it('Should reset cart items to that of firebase for logged in users', () => {
        const mockInitialState = {
            ...initialState,
            cartItems: [{ id: 1, quantity: 5 }, {id: 2, quantity: 1}]
        };
        const mockFirebaseCart =  [{ id: 7, quantity: 3 }, {id: 2, quantity: 4}];
        expect(
          cartReducer(initialState, {
            type: SET_CART_FROM_FIREBASE,
            payload: mockFirebaseCart
          })
        ).toEqual({
          ...mockInitialState,
          cartItems: mockFirebaseCart
        });
    })

})
