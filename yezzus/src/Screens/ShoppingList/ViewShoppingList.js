import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Header, Button, FlatList, List } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class ViewShoppingList extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
          }}
          centerComponent={{ text: 'SHOPPING LIST',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }}
          rightComponent={{ icon: 'home', color: '#fff', onPress: () => goBack() }}
          containerStyle={{
            height: 85,
            justifyContent: 'space-around'
          }}
        />


        {/* <List>
            <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
            />
        </List> */}

        <Button
            title='Add Item'
            titleStyle={{ fontSize: 20 }}
            buttonStyle={{
                width: 300,
                height: 45
            }}
            containerStyle={{
                alignItems: 'center',
                marginTop: 15
            }}
            onPress={Actions.addShopList}
            />
        <Button
            title='Edit Item'
            titleStyle={{ fontSize: 20 }}
            buttonStyle={{
                width: 300,
                height: 45
            }}
            containerStyle={{
                alignItems: 'center',
                marginTop: 15
            }}
            onPress={Actions.editShopList}
            />

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
    backgroundColor: '#0E5AC4',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
