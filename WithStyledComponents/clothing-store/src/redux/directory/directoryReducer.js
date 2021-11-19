import sections from "../../data/directoryData.js";

const initialState = {
    sections: sections
};

const directoryReducer = (state = initialState, action ) => {
    switch(action.type){
        default:
            return state;
    }
};

export default directoryReducer;