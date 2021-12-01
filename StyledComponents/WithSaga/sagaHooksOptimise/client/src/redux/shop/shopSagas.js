import { takeLatest, call, put, all } from "redux-saga/effects";
import { FETCH_COLLECTIONS_START } from "./shopActionTypes";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shopActons";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export function* fetchCollectionsAsync(){
    // yield console.log("I am fired!");
    try {
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart(){
    // Take latest is a better option here than takeEvery as it cancels 
    // any other running requests and runs only the final one 
    yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}