import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  FOOD_UPDATE,
  FOOD_CREATE,
  FOOD_FETCH_SUCCESS,
  FOOD_SAVE_SUCCESS
} from './types';

export const foodUpdate = ({ prop, value }) => {
  return {
    type: FOOD_UPDATE,
    payload: { prop, value }
  };
};

export const foodCreate = ({ name, exp, quantity }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/Location/Pantry`)
    .push({ name, exp, quantity })
    .then(() => {
      dispatch({ type: FOOD_CREATE });
      Actions.pop();
    });
  };
};

export const foodFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/Location/Pantry`)
      .on('value', snapshot => {
        dispatch({ type: FOOD_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const foodSave = ({ name, exp, quantity, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/Location/Pantry/${uid}`)
      .set({ name, exp, quantity })
      .then(() => {
        dispatch({ type: FOOD_SAVE_SUCCESS });
        Actions.mainInventory({ type: 'reset' });
      });
  };
};

export const foodDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}//Location/Pantry/${uid}`)
      .remove()
      .then(() => {
        Actions.mainInventory({ type: 'reset' });
      });
  };
};
