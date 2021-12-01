
import { FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_FAILURE } from "./shopActionTypes";
import { fetchCollectionsStart, fetchCollectionsSuccess, fetchCollectionsFailure } from "./shopActons";

describe("Testing fetchCollectionsStart action creator", () => {
    it("The fetchCollectionsStart action creator should create an action object with the appropiate type", () => {
        expect(fetchCollectionsStart()).toEqual({ type: FETCH_COLLECTIONS_START });
    })
})

describe('fetchCollectionsSuccess action', () => {
    it('should create the fetchCollectionsSuccess action', () => {
      const mockCollectionsMap = {
        hats: {
          id: 1
        }
      };
      const action = fetchCollectionsSuccess(mockCollectionsMap);
      expect(action.type).toEqual(FETCH_COLLECTIONS_SUCCESS);
      expect(action.payload).toEqual(mockCollectionsMap);
    });
  });
  
  describe('fetchCollectionsFailure action', () => {
    it('should create the fetchCollectionsFailure action', () => {
      const action = fetchCollectionsFailure('errored');
  
      expect(action.type).toEqual(FETCH_COLLECTIONS_FAILURE);
      expect(action.payload).toEqual('errored');
    });
  });
  
  describe('fetchCollectionsStartAsync action', () => {
    it('should create the fetchCollectionsStartAsync action', () => {
      const mockActionCreator = fetchCollectionsStartAsync();
      const mockDispatch = jest.fn();
      mockActionCreator(mockDispatch);
  
      expect(mockDispatch).toHaveBeenCalledWith(fetchCollectionsStart());
    });
  });