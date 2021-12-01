import { REGISTER_FAILURE, SIGN_IN_FAILURE, SIGN_OUT_FAILURE, SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS } from "./userActionTypes"
import userReducer from "./userReducer";

const initialState = {
    currentUser: null,
    error: null
}

describe("User Reducer", () => {

    it("The reducer should return the initial state if no state passed as first argument", () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    })

    it('should set errorMessage to payload if SIGN IN error caused', () => {
        expect(
          userReducer(initialState, {
            type: SIGN_IN_FAILURE,
            payload: 'Houston, we have a SIGN IN problem!'
          })
        ).toEqual({
          ...initialState,
          error: 'Houston, we have a SIGN IN problem!'
        });
    })

    it('should set errorMessage to payload if SIGN OUT error caused', () => {
        expect(
          userReducer(initialState, {
            type: SIGN_OUT_FAILURE,
            payload: 'Houston, we have a SIGN OUT problem!'
          })
        ).toEqual({
          ...initialState,
          error: 'Houston, we have a SIGN OUT problem!'
        });
    })

    it('should set errorMessage to payload if register error caused', () => {
        expect(
          userReducer(initialState, {
            type: REGISTER_FAILURE,
            payload: 'Houston, we have a REGISTER problem!'
          })
        ).toEqual({
          ...initialState,
          error: 'Houston, we have a REGISTER problem!'
        });
    })

    it('should set error and current user to null upon sign out', () => {
        expect(
          userReducer(initialState, {
            type: SIGN_IN_SUCCESS,
            payload: { id: 1, name: "Omid"}
          })
        ).toEqual({
            currentUser:{ id: 1, name: "Omid"},
            error: null
        });
    })

    it('Should set error to null and current user to logged in user upon sign in', () => {
        expect(
          userReducer(initialState, {
            type: SIGN_OUT_SUCCESS
          })
        ).toEqual({
            currentUser: null,
            error: null
        });
    })

})