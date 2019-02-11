import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import NewAcctForm from './components/NewAcctForm';
import { HomeScreen, Settings, NotificationSet, DeviceMan, ViewInventory, AddItem, ViewShoppingList } from './Screens'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} hideNavBar initial />
          <Scene key="acctCreate" component={NewAcctForm} title="Create Account" />
        </Scene>

        <Scene key="main">
          <Scene key="main" component={HomeScreen} hideNavBar initial />
          <Scene key="addInvList" component={AddItem} title="Add Item" hideNavBar />
          <Scene key="invList" component={ViewInventory} title="Inventory List" hideNavBar />
          <Scene key="settings" component={Settings} title="Settings" hideNavBar />
          <Scene key="notificationSet" component={NotificationSet} title="Notification Set" hideNavBar />
          <Scene key="deviceMan" component={DeviceMan} title="Device Man" hideNavBar />
          <Scene key="shopList" component={ViewShoppingList} title="Shopping List" hideNavBar />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
