import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBlDZtJ7DbIOG-6q_vg9v0ob77XZvXbcNg',
      authDomain: 'yeezusfreezus.firebaseapp.com',
      databaseURL: 'https://yeezusfreezus.firebaseio.com',
      projectId: 'yeezusfreezus',
      storageBucket: 'yeezusfreezus.appspot.com',
      messagingSenderId: '982035678003'
    };

  firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
