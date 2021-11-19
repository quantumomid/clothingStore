import { shopData } from '../../data/shopData'

const initialState = {
    collections: shopData
}

const shopReducer = (state = initialState, action) => {
    switch(action.payload){
        default:
            return state;
    }
}

export default shopReducer;