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
/*
export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
*/

/*
export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};
*/

/*
export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};
*/
