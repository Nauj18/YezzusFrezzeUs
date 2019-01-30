import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { Header, Button } from 'react-native-elements'

// Basic export that should export the whole screen with the data loaded.
export default class FlatListBasics extends Component {
    // runs the rendering of the groupedItems by calling groupData
    // const groupedItems = groupData(data, 2)

    renderItem = ({ item, index }) => {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      );
    };
  render() {
    return (
      <View style={styles.container}>

        <SafeAreaView style={ styles.row }>

          <Header
            leftComponent={{ icon: 'menu', color: '#fff'}}
            centerComponent={{ text: 'Inventory', style: { color: '#fff', fontSize: 30, } }}
            rightcomponent={{ icon: 'home', color: '#fff' }}
          />

          {/*<Text style={styles.header1}>Inventory</Text>*/}
          <Text style={styles.onScreenText}>
            Item:   Expiration Date:   Days Left:
          </Text>


          <FlatList
            data={ data }
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={3}
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
   marginVertical: 10,
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
  //  padding: 10,
  //  fontSize: 18,
  //  height: 44,
  //  borderColor: '#000',
  //  borderWidth: 1,
  },
  itemText: {
    fontSize: 24,
    color: '#000'
  }
});
