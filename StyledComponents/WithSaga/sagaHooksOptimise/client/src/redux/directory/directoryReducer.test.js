import directoryReducer from "./directoryReducer";
import sections from "../../data/directoryData.js";

const initialState = {
    sections
};

describe("Directory Reducer", () => {
    it("The reducer should return the initial state if no state passed as first argument", () => {
        expect(directoryReducer(undefined, {})).toEqual(initialState);
    })
})