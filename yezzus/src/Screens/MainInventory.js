import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Modal, Alert, Dimensions, TouchableOpacity, Picker } from 'react-native';
import { Header, Icon, Button, Input, Card, ButtonGroup, ListItem} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import moment from 'moment'
import Items from './Inventory/Items.json';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MainInventory extends Component {

  constructor() {
    super()
    this.state = {
        selectedIndex: 1,
        selectedLocation: "fridge",
        data: {},
        item: {},
        editedItem: {},
        editModalVisible: false,
        addModalVisible: false,
        buttonModalVisible: false,
        itemIndex: 0,
        addedItem: { name: '', quantity: '', expDate: '' },
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    let selectedLocation = "";
    switch(selectedIndex){
        case 0:
            selectedLocation = "freezer";
            break;
        case 1:
            selectedLocation = "fridge";
            break;
        case 2:
            selectedLocation = "pantry";
            break;
        default:
            break;
    }
    this.setState({selectedIndex, selectedLocation})
  }

  componentWillMount(){
    this.fetchData();
  }

  fetchData = async() => {
    const data = {
        fridge: [],
        freezer: [],
        pantry: []
    };
    Items.Location.Fridge.forEach(element => {
      data.fridge.push({ name: element.Name, expDate: element.Expiration_Date, quantity: element.Quantity });
    });
    Items.Location.Freezer.forEach(element => {
        data.freezer.push({ name: element.Name, expDate: element.Expiration_Date, quantity: element.Quantity });
      });
    Items.Location.Pantry.forEach(element => {
      data.pantry.push({ name: element.Name, expDate: element.Expiration_Date, quantity: element.Quantity });
    });
    this.setState({ data });
  }

  setEditModalVisible(editModalVisible, item, itemIndex) {
    let editedItem = {name: item.name, quantity: item.quantity, expDate: item.expDate}
    this.setState({ editModalVisible, item, itemIndex, editedItem });
  }

  setAddModalVisible(addModalVisible) {
      this.setState({ addModalVisible });
  }

  addItemNameChanged(name){
    let addedItem = this.state.addedItem;
    addedItem.name = name;
    this.setState({addedItem})
  }

  addItemQuantityChanged(quantity){
      let addedItem = this.state.addedItem;
      addedItem.quantity = quantity;
      this.setState({addedItem})
  }

  addItemExpDateChanged(expDate){
    let addedItem = this.state.addedItem;
    addedItem.expDate = expDate;
    this.setState({addedItem})
  }

  editItemNameChanged(name){
    let editedItem = this.state.editedItem;
    editedItem.name = name;
    this.setState({editedItem})
  }

  editItemQuantityChanged(quantity){
      let editedItem = this.state.editedItem;
      editedItem.quantity = quantity;
      this.setState({editedItem})
  }

  editItemExpDateChanged(expDate){
    let editedItem = this.state.editedItem;
    editedItem.expDate = expDate;
    this.setState({editedItem})
  }

  setButtonModalVisible(buttonModalVisible) {
      this.setState({buttonModalVisible})
  }

  getTodaysDate(){
    let today = (new Date()).toString().split(' ').splice(1,3)
    today[1] = today[1] + ",";
    return today.join(' ');
  }

  formatDate(item){
    let today = (new Date(item.expDate)).toString().split(' ').splice(1,3)
    today[1] = today[1] + ",";
    return today.join(' ');
  }

  getItemAndDaysLeft(item){
    let today = moment().format('YYYY-MM-DD');
    let itemExp = moment(item.expDate, "MM/DD/YYYY");
    let result = itemExp.diff(today, 'days');
    if (result == 1) return `${item.name} • ${result} day left`;
    else if (result == 0) return `${item.name} • Expires today`;
    else if (result < 0) return `${item.name} • Expired`;
    else if (result < 11) return `${item.name} • ${result} days left`;
    else return `${item.name}`;
  }

  getTitleStyle(item){
    let today = moment().format('YYYY-MM-DD');
    let itemExp = moment(item.expDate, "MM/DD/YYYY");
    let result = itemExp.diff(today, 'days');
    if (result == 0) return {color: 'orange'};
    else if (result < 0) return {color: 'red'};
  }

  deleteItem(item, index){
    const list = this.state.data[this.state.selectedLocation];
    list.splice(index, 1);
    let data = this.state.data;
    data[this.state.selectedLocation] = list;

    this.setState({ data });
  }

  addNewItem() {
    let data = {fridge: [], freezer: [], pantry: []};
    let location = this.state.selectedLocation;
    data[location].push(this.state.addedItem);
    this.state.data[location].forEach(element => {
      data[location].push(element);
    });
    this.setState({ data });
  }

  itemEdited(){
    let data = this.state.data;
    let selectedLocation = this.state.selectedLocation;
    data[selectedLocation][this.state.itemIndex] = this.state.editedItem;
    this.setState({data});
  }

  itemEdited(){
    let data = this.state.data;
    let selectedLocation = this.state.selectedLocation;
    data[selectedLocation][this.state.itemIndex] = this.state.editedItem;
    this.setState({data});
  }

  renderCard(item, index){
    const swipeButtons = [{
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => {
          this.deleteItem(item, index);
        }
      }];
      return(
        <Swipeout
        right={swipeButtons}
          autoClose={true}
          backgroundColor='transparent'
        >
        <TouchableOpacity onPress={() => { this.setEditModalVisible(true, item, index); }} >
        <Card
            title={this.getItemAndDaysLeft(item)}
            titleStyle={this.getTitleStyle(item)}>
            <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
            <Text> Expires: {this.formatDate(item)} </Text>
            <Text> Quantity: {item.quantity}</Text>
        </View>
        </Card>
        </TouchableOpacity>
        <Modal
            animationType="fade"
            transparent
            visible={this.state.editModalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={styles.containerStyle}>
                <Card
                title="EDIT ITEM"
                style={{ justifyContent: 'center' }}
                >
                <Input
                label="Food"
                value={this.state.editedItem.name}
                onChangeText={ this.editItemNameChanged.bind(this) }
                />
                <Input
                label="Quantity"
                value={this.state.editedItem.quantity}
                onChangeText={ this.editItemQuantityChanged.bind(this) }
                />
                <Input
                label="Expiration Date"
                value={this.state.editedItem.expDate}
                onChangeText={ this.editItemExpDateChanged.bind(this) }
                />
                <Button
                    onPress={() => {
                    this.itemEdited();
                    this.setEditModalVisible(false, {}, this.state.itemIndex)
                    }}
                    title='SAVE'
                    titleStyle={{ fontSize: 20 }}
                    buttonStyle={styles.buttonStyle}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        textDecorationLine: 'underline',
                        paddingTop: 10
                    }}
                    onPress={() => this.setEditModalVisible(false, {}, this.state.itemIndex)}
                >
                    Cancel
                </Text>
                </Card>
            </View>
        </Modal>
        </Swipeout>
      )
  }

  render() {
    const inventoryLocation = ['Freezer', 'Fridge', 'Pantry']
    const { selectedIndex } = this.state

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'INVENTORY',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Helvetica'
            }
          }}
          rightComponent={{ icon: 'settings', color: '#fff', onPress: () => Actions.settings() }}
          containerStyle={{
            height: 85,
            justifyContent: 'space-around',
            backgroundColor: '#457ABE'
          }}
        />
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
        <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={inventoryLocation}
            containerStyle={styles.buttonGroup}
            selectedButtonStyle={{backgroundColor:'#457ABE'}}
            innerBorderStyle={{color:'#457ABE'}}
            />

        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{paddingBottom: 5}}>Today is {this.getTodaysDate()}</Text>
        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
        </View>

          <FlatList
            data={this.state.data[this.state.selectedLocation]}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            extraData={this.state}
            renderItem={({ item, index }) => this.renderCard(item, index)}
          />

            <View style={styles.footerButton}>
            <Icon
                onPress={() => { this.setButtonModalVisible(true); }}
                reverse
                raised
                size={25}
                name='kebab-horizontal'
                type='octicon'
                color='#457ABE'
            />

            <Modal
            animationType={"fade"}
            transparent
            visible={this.state.buttonModalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.containerStyle}>
                <View style={{flex: 1,
                    position: 'absolute',
                    bottom:60,
                    left:SCREEN_WIDTH * 0.41 - 100}}>
                <Icon
                    onPress={() => { Actions.shoppingList(); this.setButtonModalVisible(false); }}
                    reverse
                    raised
                    size={24}
                    name='list-unordered'
                    type='octicon'
                    color='#457ABE'
                />
                </View>
                <View style={{flex: 1,
                    position: 'absolute',
                    bottom:100,
                    left:SCREEN_WIDTH * 0.41}}>
                <Icon
                    onPress={() => { this.setAddModalVisible(true); this.setButtonModalVisible(false); }}
                    reverse
                    raised
                    size={24}
                    name='plus'
                    type='octicon'
                    color='#457ABE'
                />
                </View>
                <View style={{flex: 1,
                    position: 'absolute',
                    bottom:60,
                    left:SCREEN_WIDTH * 0.41 + 100}}>
                <Icon
                    onPress={() => { Actions.recipes(); this.setButtonModalVisible(false); }}
                    reverse
                    raised
                    size={24}
                    name='silverware-fork-knife'
                    type='material-community'
                    color='#457ABE'
                />
                </View>
                <View style={styles.footerButton}>
                <Icon
                    onPress={() => { this.setButtonModalVisible(false); }}
                    reverse
                    raised
                    size={24}
                    name='x'
                    type='octicon'
                    color='#d7dadd'
                />
                </View>
            </View>
           </Modal>
           <Modal
             animationType="fade"
             transparent
             visible={this.state.addModalVisible}
             onRequestClose={() => {
                 Alert.alert('Modal has been closed.');
             }}>
             <View style={styles.containerStyle}>
                 <Card
                 title="ADD ITEM"
                 style={{ justifyContent: 'center' }}>
                 <Input
                 label="Item"
                 placeholder="Pineapple"
                 value={this.state.addedItem.name}
                 onChangeText={this.addItemNameChanged.bind(this)}
                 />
                 <Input
                 label="Quantity"
                 placeholder="100"
                 value={this.state.addedItem.quantity}
                 onChangeText={this.addItemQuantityChanged.bind(this)}
                 />
                 <Input
                 label="Expiration Date"
                 placeholder="10/27/2029"
                 value={this.state.addedItem.expDate}
                 onChangeText={this.addItemExpDateChanged.bind(this)}
                 />
                 <Button
                     onPress={() => {
                         this.setAddModalVisible(false);
                         this.addNewItem();
                     }}
                     title='ADD'
                     titleStyle={{ fontSize: 20 }}
                     buttonStyle={styles.buttonStyle}
                 />
                 <Text
                     style={{
                         textAlign: 'center',
                         fontSize: 20,
                         textDecorationLine: 'underline',
                         paddingTop: 10
                     }}
                     onPress={() => this.setAddModalVisible(false)}>
                     Cancel
                 </Text>
                 </Card>
             </View>
         </Modal>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1
  },
  footerButton: {
    flex: 1,
    position: 'absolute',
    bottom:0,
    left:SCREEN_WIDTH * 0.41,
  },
  buttonGroup: {
    height: 35,
    width: SCREEN_WIDTH * 0.9,
    borderColor: '#457ABE'
  },
  itemHead: {
   marginLeft: 10,
   padding: 10,
   fontSize: 18,
   fontWeight: 'bold'
  },
   item: {
    marginLeft: 10,
    padding: 10,
    fontSize: 18,
   },
   modalText: {
     fontSize: 60,
     padding: 20,
     marginTop: 20,
     marginBottom: 20,
     fontWeight: 'bold',
     alignSelf: 'center',
     alignItems: 'center'
   },
   separator: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#555'
  },
  containerStyle: {
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  position: 'relative',
  flex: 1,
  justifyContent: 'center'
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
  buttonStyle: {
    width: 300,
    height: 60,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#457ABE'
  }
});
