import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'chomley-def44.firebaseapp.com',
	projectId: 'chomley-def44',
	storageBucket: 'chomley-def44.appspot.com',
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export { firestore };
