import { UPDATE_COLLECTIONS } from "./shopActionTypes";


export const updateCollections = collectionsMap => ({
    type: UPDATE_COLLECTIONS,
    payload: collectionsMap
})
