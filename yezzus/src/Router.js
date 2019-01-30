import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import NewAcctForm from './components/NewAcctForm';
import Main2 from './Screens/Main';
import { Main, userSet, deviceMan } from './Screens/Settings';
import { ViewInventory, AddItem } from './Screens/Inventory';
import { ViewShoppingList, AddToShoppingList, EditShoppingList } from './Screens/ShoppingList';

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
          key="main"
          component={Main2}
          hideNavBar
          initial
          />
          <Scene key="addInvList" component={AddItem} title="Add Item" hideNavBar />
          <Scene key="invList" component={ViewInventory} title="Inventory List" hideNavBar />
          <Scene key="settings" component={Main} title="Settings" hideNavBar />
          <Scene key="useSet" component={userSet} title="User Set" hideNavBar />
          <Scene key="deviceMan" component={deviceMan} title="Device Man" hideNavBar />
          <Scene key="shopList" component={ViewShoppingList} title="Shopping List" hideNavBar />
          <Scene key="addShopList" component={AddToShoppingList} title="Add Shopping List" hideNavBar />
          <Scene key="editShopList" component={EditShoppingList} title="Edit Shopping List" hideNavBar />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
