import { SET_CURRENT_USER } from "./userActionTypes"

// Remember for one liner arrow functions that return an OBJECT need to wrap the curly brackets {} around PARENTHESIS ()
// i.e. so that JS knows the {} represent an object that is returned by the function (and not a function BLOCK)
export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
})