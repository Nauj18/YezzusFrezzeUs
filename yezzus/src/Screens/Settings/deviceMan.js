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
          centerComponent={{ text: "Device Manager", style: { color: '#fff'} }}
        />
        <Text>This is the Device Manager Page!</Text>
      </View>
    );
  }
}

export default Main;
