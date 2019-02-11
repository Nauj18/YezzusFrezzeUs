import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Header, icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// const list = [
//   {
//     name: 'Device Setup',
//     icon: 'devices',
//     actionName: 'device'
//   },
//   {
//     name: 'Notification Settings',
//     icon: 'notifications',
//     actionName: 'notification'
//   }
// ]
// this.onValueChange = this.onValueChange.bind(this);
// this.state = {switchValue: false};


class Main extends Component {
  render() {
    const { goBack } = this.props.navigation;
    const switchValue = false;
    return (
      <View style={{flex:1}}>
        <Header
          leftComponent={{
            icon: 'home',
            color: '#fff',
            onPress: () => goBack()
          }}
          centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
        />
        <SettingsList>
          <SettingsList.Item
            title='Device Manager'
            onPress={Actions.deviceMan}
          />
          <SettingsList.Item
            title="Notification Settings"
            hasNavArrow={false}
            hasSwitch={true}
          />
        </SettingsList>
      </View>
    );
  }
}
function onValueChange(boolean) {
  return !boolean;
}

export default Main;
