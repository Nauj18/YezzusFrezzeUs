import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Button } from 'react-native-elements';

class Main2 extends Component {
  render() {
    return (
      <View>
        <Header />
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          Logo Goes Here!
        </Text>
        <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 25 }}
        >
          <Button
          title='Inventory'
          titleStyle={{ fontSize: 20 }}
          buttonStyle={{
          width: 150,
          height: 60
          }}
          containerStyle={{
            marginRight: 20
          }}
          onPress={Actions.invList}
          />
          <Button
          title='Shopping List'
          titleStyle={{ fontSize: 20 }}
          buttonStyle={{
            width: 150,
            height: 60
          }}
          onPress={Actions.shopList}
          />
        </View>
        <Button
        title='Settings'
        onPress={Actions.settings}
        titleStyle={{ fontSize: 20 }}
        buttonStyle={{
          width: 150,
          height: 60
        }}
        containerStyle={{
          marginTop: 25,
          alignItems: 'center'
        }}
        />
      </View>
    );
  }
}

export default Main2;
