import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

class notificationSet extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View>
        <Header
          leftComponent={{
          icon: 'arrow-back', 
          color: '#fff',
          onPress: () => goBack()
        }}
          centerComponent={{ text: 'Notification Settings', 
          style: { color: '#fff' } }}
        />
        <Text>This is the Notifications Settings Page!</Text>
      </View>
    );
  }
}

export default notificationSet;
