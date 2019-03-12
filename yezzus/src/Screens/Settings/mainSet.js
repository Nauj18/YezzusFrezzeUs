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



// hasSwitch={true}
//               switchState={this.state.switchValue}
//               switchOnValueChange={this.onValueChange}
//               hasNavArrow={false}
//               title='Turn on Notifications'


class Main extends Component {
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false, loggedIn: false};
  }
  render() {

    const { goBack } = this.props.navigation;
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
            title='Notification Settings'
            onPress={Actions.notificationSet}
          />
        </SettingsList>
      </View>
    );
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}


export default Main;
