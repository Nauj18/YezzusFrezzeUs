import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ACCT_MADE,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });
    
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        loginUserFail(dispatch);
      });
  };
};

export const createUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: ACCT_MADE });

    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
    const uID = await firebase.auth().currentUser.uid;      
    console.log(uID);
    firebase.database().ref(uID + "/Location/Freezer/example/").set({
      Barcode: "001",
      Expiration_Date: "12/31/9999",
      Input_Date: "05/22/1997",
      Name: "Vanilla Ice Cream",
      Quantity: "1"
    });
    firebase.database().ref(uID + "/Location/Freezer/example1/").set({
      Barcode: "001",
      Expiration_Date: "12/31/9999",
      Input_Date: "05/22/1997",
      Name: "Chocolate Ice Cream",
      Quantity: "1"
    });
    firebase.database().ref(uID + "/Location/Fridge/example/").set({
      Barcode: "001",
      Expiration_Date: "4/4/2019",
      Input_Date: "05/22/1997",
      Name: "Milk",
      Quantity: "1"
    });firebase.database().ref(uID + "/Location/Fridge/example2/").set({
      Barcode: "001",
      Expiration_Date: "12/31/9999",
      Input_Date: "05/22/1997",
      Name: "Chocolate Milk",
      Quantity: "1"
    });
    firebase.database().ref(uID + "/Location/Pantry/example/").set({
      Barcode: "001",
      Expiration_Date: "12/31/9999",
      Input_Date: "05/22/1997",
      Name: "Spicy Potatoes",
      Quantity: "12"
    });
    firebase.database().ref(uID + "/Location/Pantry/example2/").set({
      Barcode: "001",
      Expiration_Date: "12/31/9999",
      Input_Date: "05/22/1997",
      Name: "Cinnamon Potatoes",
      Quantity: "12"
    });
    firebase.database().ref(uID + "/ShoppingList/example/").set({
      Name: "Apples",
      Barcode: "0001",
      Quantity: "1"
    });
    Actions.mainInventory();
  };
};

export const facebookLogin = () => async dispatch => {
    const token = await AsyncStorage.getItem('fb_token');
    //
    // if (token) {
    // // Dispatch an action saying FB login is done
    // dispatch({
    //   type: FACEBOOK_LOGIN_SUCCESS,
    //   payload: token,
    // },
    //   Actions.mainInventory()
    // );
    // } else {
    // Start up FB Login process
    doFacebookLogin(dispatch);
    // }
  };

const doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('286320171987520', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({
    type: FACEBOOK_LOGIN_SUCCESS,
    payload: token
  },
    Actions.mainInventory()
  )
  .catch((error) =>
    console.log(error));
};


const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  //AsyncStorage.setItem(user);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.mainInventory();
};
