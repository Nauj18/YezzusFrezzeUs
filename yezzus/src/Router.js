import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import NewAcctForm from './components/NewAcctForm';
import Main from './Screens/Main';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene
          key="login"
          component={LoginForm}
          hideNavBar
          initial
          />
          <Scene key="acctCreate" component={NewAcctForm} title="Create Account" />
        </Scene>

        <Scene key="main">
          <Scene
          key="Main"
          component={Main}
          hideNavBar
          initial
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
