import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';

import store from './src/store';
import Router from './src/Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyB53_w0lzMMMBkZ2RPWxC0MkIwD8-9L3ng",
      authDomain: "mykitchen-f7bee.firebaseapp.com",
      databaseURL: "https://mykitchen-f7bee.firebaseio.com",
      projectId: "mykitchen-f7bee",
      storageBucket: "mykitchen-f7bee.appspot.com",
      messagingSenderId: "297688074849"
    };
    firebase.initializeApp(config);  
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
