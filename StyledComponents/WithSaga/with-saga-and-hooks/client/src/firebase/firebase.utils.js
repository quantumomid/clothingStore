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

  // Gets the snapshot collection and we map it to an object
  export const convertCollectionsSnapshotToMap = (collections) => {

    // .docs will give us the query snapshot array - then we map through
    // each of the data and destructure for the title and items
    const transformedCollection = collections.docs.map( doc => {

      const { title, items } = doc.data();
    
      // encodeURI is a JS method that takes a string and converts any characters
      // that a url would not understand into ones it would be able to read
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
    // console.log(transformedCollection);
    
    //convert from an array into an object where the key is the title of the
    // collection and the value the actual collection
    return transformedCollection.reduce((accumulator, collection) => {
      // console.log(collection);
      accumulator[collection.title.toLowerCase()] = collection;
      // console.log(accumulator);
      return accumulator;
    }, {});

  };

  firebase.initializeApp(config)

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    })
  }

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  export const googleProvider = new firebase.auth.GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

  export default firebase