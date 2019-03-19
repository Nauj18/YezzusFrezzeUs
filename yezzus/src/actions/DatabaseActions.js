import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  ADD_ITEM_SUCCESS
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
