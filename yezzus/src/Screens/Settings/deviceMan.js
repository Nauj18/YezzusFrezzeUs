import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

class deviceMan extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View>
        <Header
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => goBack() }}
          centerComponent={{ text: 'Device Manager', style: { color: '#fff' } }}
        />
        <Text>This is the Device Manager Page!</Text>
      </View>
    );
  }
}

export default deviceMan;
