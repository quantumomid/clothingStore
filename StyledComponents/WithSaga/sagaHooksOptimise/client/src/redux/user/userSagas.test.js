import { takeLatest, put, call } from 'redux-saga/effects';
import { REGISTER_SUCCESS, SIGN_OUT_START, CHECK_USER_SESSION, EMAIL_SIGN_IN_START, GOOGLE_SIGN_IN_START } from "./userActionTypes";
import { onRegisterSuccess, signInAfterRegister, onRegisterStart, register, onSignOutStart, signOut, onCheckUserSession, isUserAuthenticated, onEmailSignInStart, signInWithEmail, onGoogleSignInStart, signInWithGoogle, getSnapshotFromUserAuth } from "./userSagas"
import { signOutSuccess, signOutFailure, signInFailure } from "./userActions";
import { auth, getCurrentUser, createUserProfileDocument } from "../../firebase/firebase.utils";

describe('On Register success saga', () => {
    it('should trigger on REGISTER_SUCCESS', () => {
      const generator = onRegisterSuccess();
      expect(generator.next().value).toEqual(
        takeLatest(REGISTER_SUCCESS, signInAfterRegister)
      );
    });
});

describe('On register start saga', () => {
    it('Should trigger on REGISTER_START', () => {
      const generator = onRegisterStart();
      expect(generator.next().value).toEqual(
        takeLatest(REGISTER_START, register)
      );
    });
});

describe('On signout start saga', () => {
    it('Should trigger on SIGN_UP_START', () => {
      const generator = onSignOutStart();
      expect(generator.next().value).toEqual(
        takeLatest(SIGN_OUT_START, signOut)
      );
    });
});

describe('On check user session saga', () => {
    it('Should trigger on CHECK_USER_SESSION', () => {
      const generator = onCheckUserSession();
      expect(generator.next().value).toEqual(
        takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
      );
    });
  });

  describe('On email sign in start saga', () => {
    it('Should trigger on EMAIL_SIGN_IN_START', () => {
      const generator = onEmailSignInStart();
      expect(generator.next().value).toEqual(
        takeLatest(EMAIL_SIGN_IN_START, signInWithEmail)
      );
    });
  });

  describe('On google sign in start saga', () => {
    it('Should trigger on GOOGLE_SIGN_IN_START', () => {
      const generator = onGoogleSignInStart();
      expect(generator.next().value).toEqual(
        takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle)
      );
    });
  });
  
  describe('On sign in after register saga', () => {
    it('Should fire getSnapshotFromUserAuth', () => {
      const mockUser = {};
      const mockAdditionalData = {};
      const mockAction = {
        payload: {
          user: mockUser,
          additionalData: mockAdditionalData
        }
      };
  
      const generator = signInAfterRegister(mockAction);
      expect(generator.next().value).toEqual(
        getSnapshotFromUserAuth(mockUser, mockAdditionalData)
      );
    });
  });

  describe('On Register saga', () => {
    const mockEmail = 'omid@gmail.com';
    const mockPassword = 'test123';
    const mockDisplayName = 'omid';
  
    const mockAction = {
      payload: {
        email: mockEmail,
        password: mockPassword,
        displayName: mockDisplayName
      }
    };
  
    const generator = register(mockAction);
  
    it('Should call auth.createUserWithEmailAndPassword', () => {
      const createUserWithEmailAndPassword = jest.spyOn(
        auth,
        'createUserWithEmailAndPassword'
      );
      generator.next();
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  describe('On sign out saga', () => {
    const generator = signOut();
  
    it('should call auth.signOut', () => {
      const expectSignOut = jest.spyOn(auth, 'signOut');
      generator.next();
      expect(expectSignOut).toHaveBeenCalled();
    });
  
    it('Should call signOutSuccess', () => {
      expect(generator.next().value).toEqual(put(signOutSuccess()));
    });
  
    it('Should call signOutFailure on error', () => {
      const newGenerator = signOut();
      newGenerator.next();
      expect(newGenerator.throw('error').value).toEqual(
        put(signOutFailure('error'))
      );
    });
  });

  describe('Is user authenticated saga', () => {
    const generator = isUserAuthenticated();
  
    it('should call getCurrentUser', () => {
      expect(generator.next().value).toEqual(getCurrentUser());
    });
  
    it('Should call getSnapshotFromUserAuth if userAuth exists', () => {
      const mockUserAuth = { uid: '123da' };
      expect(generator.next(mockUserAuth).value).toEqual(
        getSnapshotFromUserAuth(mockUserAuth)
      );
    });
  
    it('Should call signInFailure on error', () => {
      const newGenerator = isUserAuthenticated();
      newGenerator.next();
      expect(newGenerator.throw('error').value).toEqual(
        put(signInFailure('error'))
      );
    });
  });

  describe('Get snapshot from userAuth', () => {
    const mockUserAuth = {};
    const mockAdditionalData = {};
    const generator = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);
  
    expect(generator.next().value).toEqual(
      call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
    );
  });