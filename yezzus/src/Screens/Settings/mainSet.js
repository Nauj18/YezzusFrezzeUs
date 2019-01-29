import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

class Main extends Component {
  render() {
    return (
      <View>
        <Header />
        <Text>These are settings!</Text>
        <Button title="Device Manager"/>
        <Button title="User Settings"/>
      </View>
    );
  }
}

export default Main;
