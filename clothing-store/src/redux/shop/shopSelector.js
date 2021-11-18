import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const collectionIdMap = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
};

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// Since collectionUrlParam is a dynamic  argument - to memoize selectShopCollection we will need to actually 
// memoize the WHOLE function - we do this with the help of the memoize() function from lodash 
export const selectShopCollection = memoize(collectionUrlParam => createSelector(
    [selectShopCollections], 
    collections => collections.find(collection => collection.id === collectionIdMap[collectionUrlParam])
)) 