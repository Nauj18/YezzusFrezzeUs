import React, { Component } from 'react';
import { StyleSheet, View, Input } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Header } from 'react-native-elements';
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
  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false, loggedIn: false};
  }
  render() {

    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff', onPress: () => goBack() }}
          centerComponent={{ text: 'Settings',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }}
        />
        <SettingsList>
          <SettingsList.Item
            title='Device Manager'
            onPress={Actions.deviceMan}
          />
          <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Turn on Notifications'
            />
        </SettingsList>
      </View>
    );
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1
  },
  itemHead: {
   marginLeft: 10,
   padding: 10,
   fontSize: 18,
   fontWeight: 'bold'
  },
   item: {
    marginLeft: 10,
    padding: 10,
    fontSize: 18,
   },
   modalText: {
     fontSize: 60,
     padding: 20,
     marginTop: 20,
     marginBottom: 20,
     fontWeight: 'bold',
     alignSelf: 'center',
     alignItems: 'center'
   },
   separator: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#555'
  },
  containerStyle: {
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  position: 'relative',
  flex: 1,
  justifyContent: 'center'
  },
  textInput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
      backgroundColor: '#e7e7e7',
      paddingLeft: 10,
      paddingRight: 10,
  },
  buttonStyle: {
    width: 300,
    height: 60,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  }
});

export default Main;
