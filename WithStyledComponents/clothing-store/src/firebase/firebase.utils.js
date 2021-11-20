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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    // Allows us to batch/group all of our calls into one big request
    // this will allow us to only add the data if all succeed but if one fails 
    // then all fail 
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      // Getting new document reference in this collecion and 
      // generating new random Id v
      const newDocRef = collectionRef.doc();
      console.log(newDocRef);
      batch.set(newDocRef, obj);
    });

    // fire off our batch call
    // this returns a promise
    return await batch.commit();
  };

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase