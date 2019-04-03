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
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
      });
  };
};

export const createUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: ACCT_MADE });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
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
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.mainInventory();
};
