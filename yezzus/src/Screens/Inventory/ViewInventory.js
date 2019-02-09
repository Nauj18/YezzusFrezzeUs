import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Basic export that should export the whole screen with the data loaded.
export default class ViewInventory extends Component {
    // runs the rendering of the groupedItems by calling groupData
    // const groupedItems = groupData(data, 2)

    renderItem = ({ item, index }) => {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{'\t\t\t'+item.key}</Text>
        </View>
      );
    };
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>

        <SafeAreaView style={styles.row} >

          <Header
            leftComponent={{
              icon: 'home',
              color: '#fff',
              onPress: () => Actions.main()
             }}
            centerComponent={{ text: 'Inventory', style: { color: '#fff', fontSize: 30, } }}
            rightComponent={{
              icon: 'list',
              color: '#fff',
              onPress: () => Actions.shopList()
            }}
          />

          {/*<Text style={styles.header1}>Inventory</Text>*/}
          <Text style={styles.onScreenText}>
            Item:{'\t\t\t'}Expiration Date:{'\t\t\t'}Days Left:
          </Text>


          <FlatList
            data={data}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={3}
          />
          <Button
          title='Add Item'
          // TODO: Find out what addInvList is
          onPress={Actions.addInvList}
          />
        </SafeAreaView>
      </View>
    );
  }
}

// Used to have a data variable that contains data to be rendered
const data = [
  { key: 'Eggs:' },
  { key: '1/29/19' },
  { key: 7 },
  { key: 'Cheese: ' },
  { key: '1/30/19 ' },
  { key: 8 },
  { key: 'Pizza:' },
  { key: '1/31/19' },
  { key: 9 },
  { key: 'Yeeter: ' },
  { key: '1/32/19' },
  { key: 10 },
];

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'row',
   height: 400,
   paddingLeft: 4,
  },
  header1: {
    marginTop: 50,
    paddingLeft: 115,
    paddingRight: 115,
    alignSelf: 'center',
    backgroundColor: '#4d243d',
    fontSize: 36,
    color: '#ffffff',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  header2: {
    marginTop: 50,
  },
  onScreenText: {
    fontSize: 23,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopColor: '#000',
    borderTopWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 4,
    marginTop: 10,
  },
  item: {
    flex: 1,
    margin: 3,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingRight: 10,
    width: 140,
  },
  itemText: {
    fontSize: 24,
    color: '#000'
  }
});
