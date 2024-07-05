// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

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

const analytics = getAnalytics(app);
const database = getFirestore(app);

export { database };
