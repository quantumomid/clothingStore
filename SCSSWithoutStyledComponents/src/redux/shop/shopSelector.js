import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

// Since collectionUrlParam is a dynamic  argument - to memoize selectShopCollection we will need to actually 
// memoize the WHOLE function - we do this with the help of the memoize() function from lodash 
export const selectShopCollection = memoize(collectionUrlParam => createSelector(
    [selectShopCollections], 
    collections => collections[collectionUrlParam]
)) 