import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  ADD_ITEM_SUCCESS
  READ_DB_SUCCESS
} from '../Screens/Inventory/addTypes';

export const addAnItem = ({ name, expDate, quantity }) => {

  return (dispatch) => {
  firebase.database().ref(`/yeesusfreezus/Location/`)
    .push({ name, expDate, quantity })
    .then(() => {
      dispatch({ type: ADD_ITEM_SUCCESS });
      Actions.pop();
    });
  };
};

export function readFirebaseStore() {
    return dispatch => {
        dispatch(readFirebaseStoreRequestedAction());
        return database.ref('/').once('value', snap => {
            const firebaseStore = snap.val();
            dispatch(readFirebaseStoreFulfilledAction(firebaseStore))
        })
        .catch((error) => {
            console.log(error);
            dispatch(readFirebaseStoreRejectedAction());
        });
    }
}

function readFirebaseStoreRequestedAction() {
    return {
        type : ActionTypes.READ_FIREBASE_STORE_REQUESTED
    };
}

function readFirebaseStoreRejectedAction() {
    return {
        type : ActionTypes.READ_FIREBASE_STORE_REJECTED
    };
}

function readFirebaseStoreFulfilledAction(firebaseStore) {
    return {
        type : ActionTypes.READ_FIREBASE_STORE_FULFILLED,
        firebaseStore
    };
}
