import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class AddItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add Item:</Text>

        <TextInput
        style={styles.textInput}
        placeholder="Item name"
        underlineColorAndroid={'transparent'}
        />

        <TextInput
        style={styles.textInput}
        placeholder="Expiration Date"
        underlineColorAndroid={'transparent'}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btntext}>Add Item</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  header: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#000',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
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
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    paddingLeft: 100,
    paddingRight: 100,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  }
});