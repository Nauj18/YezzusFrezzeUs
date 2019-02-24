import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Button, Input } from 'react-native-elements';
import firebase from './src/firebase.js'

export default class AddItem extends Component {
    constructor() {
      super();
      this.setState() = {
        currentItem: '',
        expDate: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
      e.preventDefault();
      const itemsRef = firebase.database().ref('items');
      const item = {
        title: this.state.currentItem,
        exp: this.state.expDate
      }
      itemsRef.push(item);
      this.setState({
        currentItem: '',
        expDate: ''
      });
    }

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container} onSubmit={this.handleSubmit}>
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
          onChange={this.handleChange}
          value={this.state.currentItem}
        />

        <Input
          label="Expiraton Date"
          style={styles.textInput}
          placeholder="2/30/2019"
          containerStyle={{ marginLeft: 10, marginTop: 20 }}
          onChange={this.handleChange}
          value={this.state.expDate}
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
