import firebase from "firebase";

const firebaseapp=firebase.initializeApp({

        apiKey: "AIzaSyBQAMU0eDu6nPI-WSf-uMHXiIy3_BSdfM4",
        authDomain: "chatterbox-e2c5e.firebaseapp.com",
        databaseURL: "https://chatterbox-e2c5e.firebaseio.com",
        projectId: "chatterbox-e2c5e",
        storageBucket: "chatterbox-e2c5e.appspot.com",
        messagingSenderId: "345124685800",
        appId: "1:345124685800:web:24fe04426a1281e458c65d"

});


const db=firebaseapp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export  { db, auth, storage,firebase };