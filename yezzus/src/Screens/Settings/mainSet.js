import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class Main extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View>
        <Header
          leftComponent={{
            icon: 'home',
            color: '#fff',
            onPress: () => goBack()
          }}
          centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
        />
        <Text>These are settings!</Text>
        <Button
        title="Device Manager"
        onPress={Actions.deviceMan}
        />
        <Button
        title="User Settings"
        onPress={Actions.useSet}
        />
      </View>
    );
  }
}

export default Main;
