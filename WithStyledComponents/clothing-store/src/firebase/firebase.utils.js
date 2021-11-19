import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyB5MO17LhbIKDdVBCHq6QIexg29bDz-szA",
  authDomain: "clothingstore-db-7b10e.firebaseapp.com",
  projectId: "clothingstore-db-7b10e",
  storageBucket: "clothingstore-db-7b10e.appspot.com",
  messagingSenderId: "62786690835",
  appId: "1:62786690835:web:ce6245e3c38e7bbc3444e6",
  measurementId: "G-SMS9JQ5VPV"
};

  // async function because making requests to database
  export const createUserProfileDocument = async(userAuth, additionalData) => {
    
    if(!userAuth) return;
    //firestore returns either of two objects: REFERENCES or SNAPSHOTS - these objects can be of DOCUMENT or COLLECTION version.
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    // console.log(snapShot)

    if(!snapShot.exists){
      const { displayName, email } = userAuth

      const createdAt = new Date()

      //Therefore if the snapshot doesnt exist then we will create a new user 
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase