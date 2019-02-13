import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Button, Input } from 'react-native-elements';

export default class AddItem extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => goBack() }}
        centerComponent={{ text: 'ADD ITEM',
          style: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold'
          }
        }}
      />

        <Input
        label="Item Name"
        style={styles.textInput}
        placeholder="Apples"
        containerStyle={{ marginLeft: 10, marginTop: 20 }}
        />

        <Input
        label="Expiraton Date"
        style={styles.textInput}
        placeholder="2/30/2019"
        containerStyle={{ marginLeft: 10, marginTop: 20 }}
        />

        <Button
        title='ADD ITEM'
        titleStyle={{ fontSize: 20 }}
        buttonStyle={{
          width: 300,
          height: 60,
          marginTop: 10,
          alignSelf: 'center',
          alignItems: 'center',
        }}
        onPress={console.log('Item Added')}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
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
  }
});
