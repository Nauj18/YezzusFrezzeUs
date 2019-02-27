import React, { Component } from 'react';
import { StyleSheet, View,  FlatList, TextInput } from 'react-native';
import { Header, CheckBox, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import Items from '../Inventory/Items.json';

export default class ViewShoppingList extends Component {
  state = {
    data: [],
    checked: [],
  };

  componentWillMount(){
    this.fetchData();
  }

  fetchData = async() => {
    /** 
    // Random name API
    const response = await fetch('https://randomuser.me/api?results=20');
    const json = await response.json();
    let data = [];
    json.results.forEach(element => {
      data.push({name: `${element.name.first} ${element.name.last}`})
    });
    **/
    let data = [];
    Items.Location.Fridge.forEach( element => {
      data.push({name: element.Name})
    })
    Items.Location.Pantry.forEach( element => {
      data.push({name: element.Name})
    })
    this.setState({ data: data });
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  changeCheckBox = (index) => {
    let checked = this.state.checked;
    checked[index] = !checked[index];
    this.setState({ checked });
  }

  addNewItem() {
    let data = [];
    data.push({name: ""});
    this.state.data.forEach(element => {
      data.push(element);
    });
    let checked = [false];
    this.state.checked.forEach(element => {
      checked.push(element);
    });
    this.setState({ data, checked });
  }

  itemChanged(newItem, index){
    let data = this.state.data;
    data[index].name = newItem;
    this.setState({ data });
  }

  deleteItem(item, index){
    let data = this.state.data;
    let checked = this.state.checked;
    data.splice(index, 1);
    checked.splice(index, 1);
    this.setState({ data, checked });
  }

  renderRow(item, index){
    let swipeButtons = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteItem(item, index) }
    }];
    return(
      <Swipeout right={swipeButtons}
        autoClose={true}
        backgroundColor='transparent'>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
            <TextInput style={styles.item} 
              editable = {true}
              value={item.name}
              onChangeText={(text) => {this.itemChanged(text, index)}}>
            </TextInput>
              
            <CheckBox
              style={styles.checkBox}
              right
              onPress={() => this.changeCheckBox(index)}
              checked={this.state.checked[index]} />
          </View>
        </Swipeout>
    )
  }

  render() {
    const { goBack } = this.props.navigation;
  
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => goBack() }}
          centerComponent={{ text: 'SHOPPING LIST',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }}
          containerStyle={{
            height: 85,
            justifyContent: 'space-around',
            backgroundColor: '#457ABE'
          }}
        />
        <View>
        <Icon
          name='add'
          size={30}
          containerStyle={{
            alignItems:'flex-end',
            paddingLeft: 6,
            paddingTop: 5
          }}
          onPress={() => this.addNewItem()} />
        </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            extraData={this.state}
            renderItem={({item, index}) => this.renderRow(item, index)}
          />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex:1
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
  },
   item: {
    paddingLeft: 50,
    padding: 10,
    fontSize: 18,
    width: "75%"
   },
   separator: {
    height: 0.5,
    width: "90%",
    alignSelf: 'center',
    backgroundColor: "#555"
  },
});