import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

class Main extends Component {
  render() {
    return (
      <View>
        <Header 
          placement="left"
          leftComponent={{ icon: 'arrow-back', color: '#fff' }} 
          centerComponent={{ text: "User Settings", style: { color: '#fff'} }}
        />
        <Text>This is the User Settings Page!</Text>
      </View>
    );
  }
}

export default Main;
