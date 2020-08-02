import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA0R017asPg5qdmxNI_Bpuyzioilz0jcyA",
  authDomain: "catch-of-the-day-8528e.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-8528e.firebaseio.com"
    
});

const base = Rebase.createClass(firebaseApp.database());



export { firebaseApp };

export default base;
