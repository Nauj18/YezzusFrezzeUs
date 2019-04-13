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

/***********************************************
  *This is where the Fridge items are Created*
 ***********************************************/
export const foodFridgeCreate = ({ name, exp, quantity }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/${currentUser.uid}/Location/Fridge`)
    .push({ name, exp, quantity })
    .then(() => {
      dispatch({ type: FOOD_CREATE });
      Actions.pop();
    });
  };
};

/***********************************************
  *This is where the Freezer items are Created*
 ***********************************************/
export const foodFreezerCreate = ({ name, exp, quantity }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/${currentUser.uid}/Location/Freezer`)
    .push({ name, exp, quantity })
    .then(() => {
      dispatch({ type: FOOD_CREATE });
      Actions.pop();
    });
  };
};

/***********************************************
  *This is where the Pantry items are Created*
 ***********************************************/
export const foodPantryCreate = ({ name, exp, quantity }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/${currentUser.uid}/Location/Pantry`)
    .push({ name, exp, quantity })
    .then(() => {
      dispatch({ type: FOOD_CREATE });
      Actions.pop();
    });
  };
};


/***********************************************
  *This is where the Fridge items are fetched*
 ***********************************************/
export const foodFridgeFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/Location/Fridge`)
      .on('value', snapshot => {
        dispatch({ type: FOOD_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};


/***********************************************
  *This is where the Pantry items are fetched*
 ***********************************************/
export const foodPantryFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/Location/Pantry`)
      .on('value', snapshot => {
        dispatch({ type: FOOD_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

/***********************************************
  *This is where the Freezer items are fetched*
 ***********************************************/
export const foodFreezerFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/Location/Freezer`)
      .on('value', snapshot => {
        dispatch({ type: FOOD_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

/***********************************************
    *This is where the Pantry items are Saved*
 ***********************************************/
export const foodPantrySave = ({ name, exp, quantity, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/Location/Pantry/${uid}`)
      .set({ name, exp, quantity })
      .then(() => {
        dispatch({ type: FOOD_SAVE_SUCCESS });
        Actions.mainInventory({ type: 'reset' });
      });
  };
};

/***********************************************
    *This is where the Freezer items are Saved*
 ***********************************************/
export const foodFreezerSave = ({ name, exp, quantity, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/Location/Freezer/${uid}`)
      .set({ name, exp, quantity })
      .then(() => {
        dispatch({ type: FOOD_SAVE_SUCCESS });
        Actions.mainInventory({ type: 'reset' });
      });
  };
};

/***********************************************
    *This is where the Fridge items are Saved*
 ***********************************************/
export const foodFridgeSave = ({ name, exp, quantity, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/Location/Fridge/${uid}`)
      .set({ name, exp, quantity })
      .then(() => {
        dispatch({ type: FOOD_SAVE_SUCCESS });
        Actions.mainInventory({ type: 'reset' });
      });
  };
};

/***********************************************
    *This is where a Fridge item is Deleted*
 ***********************************************/
export const foodFridgeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/${currentUser.uid}//Location/Fridge/${uid}`)
      .remove()
      .then(() => {
        Actions.mainInventory({ type: 'reset' });
      });
  };
};

/***********************************************
    *This is where a Pantry item is Deleted*
 ***********************************************/
export const foodPantryDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/${currentUser.uid}//Location/Pantry/${uid}`)
      .remove()
      .then(() => {
        Actions.mainInventory({ type: 'reset' });
      });
  };
};

/***********************************************
    *This is where a Freezer item is Deleted*
 ***********************************************/
export const foodFreezerDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/${currentUser.uid}//Location/Freezer/${uid}`)
      .remove()
      .then(() => {
        Actions.mainInventory({ type: 'reset' });
      });
  };
};
