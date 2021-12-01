import { takeLatest, put } from 'redux-saga/effects';
import { SIGN_OUT_SUCCESS } from "../user/userActionTypes";
import { clearCartOnSignOut, onSignOutSuccess } from "./cartSagas";
import { clearCart } from "./cartActions";

describe('On signout success saga', () => {
    it('Should trigger on SIGN_OUT_SUCCESS', async () => {
      const generator = onSignOutSuccess();
      expect(generator.next().value).toEqual(
        takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut)
      );
    });
  });

  describe('Clear cart on signout saga', () => {
    it('Should fire clearCart', () => {
      const generator = clearCartOnSignOut();
      expect(generator.next().value).toEqual(put(clearCart()));
    });
  });