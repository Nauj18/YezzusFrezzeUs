
import firebase from 'firebase'
const config = {
	apiKey: "AIzaSyCCq4IfZuNrKudCKlhS7jzCQkZsxODQCSE",
	authDomain: "mykitchen-16bbe.firebaseapp.com",
	databaseURL: "https://mykitchen-16bbe.firebaseio.com",
	projectId: "mykitchen-16bbe",
	storageBucket: "mykitchen-16bbe.appspot.com",
	messagingSenderId: "743093978784"
};
firebase.initializeApp(config);
export default firebase;