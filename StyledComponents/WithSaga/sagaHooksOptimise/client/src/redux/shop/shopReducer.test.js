import { FETCH_COLLECTIONS_FAILURE, FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS } from "./shopActionTypes";
import shopReducer from "./shopReducer";

const initialState = {
    collections: null,
    isFetching: false,
    errorMessage: ""
}

describe("Shop Reducer", () => {
    it("The reducer should return the initial state if no state passed as first argument", () => {
        expect(shopReducer(undefined, {})).toEqual(initialState);
    })

    it('should set isFetching to true if fetchingCollectionsStart action', () => {
        expect(
          shopReducer(initialState, {
            type: FETCH_COLLECTIONS_START
          }).isFetching
        ).toBe(true);
    });

    it('Should set isFetching to false and collections to payload if fetchingCollectionsSuccess', () => {
        const mockItems = [{ id: 1 }, { id: 2 }];
        expect(
          shopReducer(initialState, {
            type: FETCH_COLLECTIONS_SUCCESS,
            payload: mockItems
          })
        ).toEqual({
          ...initialState,
          isFetching: false,
          collections: mockItems
        });
    })

    it('should set isFetching to false and errorMessage to payload if fetchingCollectionsFailure', () => {
        expect(
          shopReducer(initialState, {
            type: FETCH_COLLECTIONS_FAILURE,
            payload: 'Houston, we have a problem!'
          })
        ).toEqual({
          ...initialState,
          isFetching: false,
          errorMessage: 'Houston, we have a problem!'
        });
    })
})