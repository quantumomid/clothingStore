import { SIGN_OUT_SUCCESS, GOOGLE_SIGN_IN_START } from "./userActionTypes";
import { signOutSuccess, googleSignInStart } from "./userActions";

describe("Testing signOutSuccess action creator", () => {
    it("The signOutSuccess action creator should create an action object", () => {
        expect(signOutSuccess()).toEqual({ type: SIGN_OUT_SUCCESS });
    })
})

describe("Testing googleSignInStart action creator", () => {
    it("The googleSignInStart action creator should create an action object", () => {
        expect(googleSignInStart()).toEqual({ type: GOOGLE_SIGN_IN_START });
    })
})