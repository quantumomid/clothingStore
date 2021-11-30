import { createStore } from "redux";
import rootReducer from "../redux/root-reducer";

export const mockStore = (initialState) => {
    return createStore(rootReducer, initialState);
}