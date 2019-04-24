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
      apiKey: 'AIzaSyBkBMkUfNGLp7kg9VCdmcSK5f2pq8K1FRI',
      authDomain: 'yeesusfreezus.firebaseapp.com',
      databaseURL: 'https://yeesusfreezus.firebaseio.com',
      projectId: 'yeesusfreezus',
      storageBucket: 'yeesusfreezus.appspot.com',
      messagingSenderId: '812965187828'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
