// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyClXtpCW_z_JnjqHV5Q8skjKqeLgCq3blw',
    authDomain: 'steam-plus-1fae3.firebaseapp.com',
    projectId: 'steam-plus-1fae3',
    storageBucket: 'steam-plus-1fae3.appspot.com',
    messagingSenderId: '76706532058',
    appId: '1:76706532058:web:493d179a2fe7566d14f3e3',
    measurementId: 'G-09CF7SWMNS',
    databaseURL: 'https://steam-plus-1fae3-default-rtdb.firebaseio.com',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);

export { database, storage };
