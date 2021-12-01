import { takeLatest, call, put } from 'redux-saga/effects';
import {fetchCollectionsStart, fetchCollectionsFailure } from "./shopSagas";
import { FETCH_COLLECTIONS_START, fetchCollectionsAsync } from "./shopActionTypes";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"
import { fetchCollectionsSuccess } from "./shopActons";

describe('Fetch collections start saga', () => {
    it('Should trigger on FETCH_COLLECTIONS_START', () => {
      const generator = fetchCollectionsStart();
      expect(generator.next().value).toEqual(
        takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
      );
    });
});

describe('Fetch collections async saga', () => {
    const generator = fetchCollectionsAsync();
  
    it('Should call firestore collection ', () => {
      const getCollection = jest.spyOn(firestore, 'collection');
      generator.next();
      expect(getCollection).toHaveBeenCalled();
    });
  
    it('Should call convertCollectionsSnapshot saga ', () => {
      const mockSnapshot = {};
      expect(generator.next(mockSnapshot).value).toEqual(
        call(convertCollectionsSnapshotToMap, mockSnapshot)
      );
    });
  
    it('Should fire fetchCollectionsSuccess if collectionsMap is succesful', () => {
      const mockCollectionsMap = {
        hats: { id: 1 }
      };
      expect(generator.next(mockCollectionsMap).value).toEqual(
        put(fetchCollectionsSuccess(mockCollectionsMap))
      );
    });
  
    it('Should fire fetchCollectionsFailure if get collection fails at any point', () => {
      const newGenerator = fetchCollectionsAsync();
      newGenerator.next();
      expect(newGenerator.throw({ message: 'error' }).value).toEqual(
        put(fetchCollectionsFailure('error'))
      );
    });
  });