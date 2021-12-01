import { createStore } from "redux";
import rootReducer from "../redux/root-reducer";

// export const mockStore = (initialState) => {
//     return createStore(rootReducer, initialState);
// }

// To account for redux persist
export const mockStore = (initialState) => {
    const store =  createStore(rootReducer, initialState);
    return {
        ...store,
        persistor: {
          persist: () => null
        }
    };
}