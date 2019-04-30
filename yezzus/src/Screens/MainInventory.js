import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Modal, Alert, Dimensions, TouchableOpacity, Picker } from 'react-native';
import { Header, Icon, Button, Input, Card, ButtonGroup, ListItem} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';
import { Font } from 'expo';
import Items from './Inventory/Items.json';
import firebase from 'firebase';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MainInventory extends Component {

  constructor(props) {
    super(props)
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
        firebaseItem: [],
        addedItem: { Name: '', Quantity: '', Expiration_Date: '' },
        litName: [],
        litExpDate: [],
        litQty: [],
        fontLoaded: false,
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

  async componentDidMount(){
    await Font.loadAsync({
      'Helvetica': require('../../assets/fonts/Helvetica.ttf'),
    });

    this.setState({ fontLoaded: true });
    
    await this.fetchData();
  }

  async fetchData() {
    const uID = firebase.auth().currentUser.uid;
    console.log("The uID is: " + uID);

    const fdata = {
      fridge: [],
      freezer: [],
      pantry: []
    };

    /***********************************************
     *This is where the inventory is filled
     ***********************************************/
    firebase.database().ref().child(uID + "/Location/").once("value", snapshot => {
      const locations = snapshot.val();
      if (locations){
        Object.keys(locations).forEach(loc =>
          firebase.database().ref().child(uID + "/Location/" + loc).once("value", snapshot => {
            const Firebasedata = snapshot.val();
            if (Firebasedata) {
              Object.keys(Firebasedata).forEach(fridgeItem =>
                firebase.database().ref().child(uID + "/Location/" + loc + "/" + fridgeItem).once("value", snapshot => {
                  const item = snapshot.val();
                  console.log(item)
                  fdata[loc.toLowerCase()].push({ name: item.Name, quantity: item.Quantity, expDate: item.Expiration_Date, key: fridgeItem });
                  //console.log(fdata);
                  this.setState({ data: fdata });
                })
              );
            }
          })
        )
      }
    });
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
    addedItem.Name = name;
    this.setState({addedItem})
  }

  addItemQuantityChanged(quantity){
      let addedItem = this.state.addedItem;
      addedItem.Quantity = quantity;
      this.setState({addedItem})
  }

  addItemExpDateChanged(expDate){
    let addedItem = this.state.addedItem;
    addedItem.Expiration_Date = expDate;
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
    let ddata = this.state.data;
    let selectedLocation = this.state.selectedLocation;
    let deleteKey = ddata[selectedLocation][index].key;
    const list = ddata[selectedLocation];
    console.log("This is the list: " + deleteKey);
    list.splice(index, 1);
    let data = this.state.data;
    data[this.state.selectedLocation] = list;
    this.setState({ data });

    if (selectedLocation == 'fridge') {
      selectedLocation = 'Fridge';
    } else if (selectedLocation == 'freezer') {
      selectedLocation = 'Freezer';
    } else { selectedLocation = 'Pantry'; }

    let uID = firebase.auth().currentUser.uid;
    firebase.database().ref().child(uID + "/Location/" + selectedLocation + "/" + deleteKey).remove();
  }

  itemEdited(){
    //Visual end of the update
    let edata = this.state.data;
    let selectedLocation = this.state.selectedLocation;
    let editedItem = this.state.editedItem;
    let itemKey = edata[selectedLocation][this.state.itemIndex].key;
    console.log(itemKey);
    edata[selectedLocation][this.state.itemIndex] = editedItem;
    console.log(editedItem);
    this.setState({ data: edata });

    //firebase side
    
    if (selectedLocation == 'fridge') {
      selectedLocation = 'Fridge';
    } else if (selectedLocation == 'freezer') {
      selectedLocation = 'Freezer';
    } else { selectedLocation = 'Pantry'; }

    let uID = firebase.auth().currentUser.uid;
    firebase.database().ref().child(uID + "/Location/" + selectedLocation + "/" + itemKey + "/").update({
      Name: editedItem.name, Quantity: editedItem.quantity, Expiration_Date: editedItem.expDate
    });

  }

  logOut() {
    Actions.reset('auth');
    firebase.auth().signOut();
  }

  addNewItem() {
    let aData = this.state.data;
    let location = this.state.selectedLocation;
    let newItem = this.state.addedItem;


    let Locations = ""
    if (location == 'fridge') {
      Locations = 'Fridge';
    } else if (location == 'freezer') {
      Locations = 'Freezer';
    } else { Locations = 'Pantry'; }


    let uID = firebase.auth().currentUser.uid;
    //This is the firebase call to add a new item to the firebase!
    const newItems = firebase.database().ref().child(uID + "/Location/" + Locations).push()
    newItems.set(this.state.addedItem, () => this.setState({
      Name: newItem.Name,
      Expiration_Date: newItem.Expiration_Date,
      Quantity: newItem.Quantity
    }))

    //All of this just to get the item key so it can be edited after being made
    let str = newItems.toString();
    let lastSlash = str.lastIndexOf('/') + 1;
    const resu = str.substring(lastSlash, str.length);
    //This adds the item to the state
    aData[location].push({ name: newItem.Name, quantity: newItem.Quantity, expDate: newItem.Expiration_Date, key: resu });
    this.setState({ data: aData });
    //This just resets the text box pretty much
    newItem.Name = '';
    newItem.Expiration_Date = '';
    newItem.Quantity = '';
    this.setState({ addedItem: newItem });
  }

  renderCard(item, index) {
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
        {
          this.state.fontLoaded ? (
            <Header
              centerComponent={{ text: 'INVENTORY',
              style: {
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Helvetica'
              }
              }}
              rightComponent={{ text: 'Logout', color: '#fff', onPress: () => { Actions.reset('auth'); firebase.auth().signOut(); }}}
              containerStyle={{
                height: 85,
                justifyContent: 'space-around',
                backgroundColor: '#457ABE'
              }}
            />
          ) : null
        }
        
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
                <View style={{flex: 1, position: 'absolute', bottom:60, alignItems: 'center', left: SCREEN_WIDTH * 0.41 - 100}}>
                  <Icon
                      onPress={() => { Actions.shoppingList(); this.setButtonModalVisible(false); }}
                      reverse
                      raised
                      size={24}
                      name='list-unordered'
                      type='octicon'
                      color='#457ABE'
                  />
                  <Text style={styles.iconLabels}>Shopping List</Text>
                </View>
                <View style={{flex: 1, position: 'absolute', bottom:100, alignItems: 'center', left: SCREEN_WIDTH * 0.41}}>
                  <Icon
                      onPress={() => { this.setAddModalVisible(true); this.setButtonModalVisible(false); }}
                      reverse
                      raised
                      size={24}
                      name='plus'
                      type='octicon'
                      color='#457ABE'
                  />
                  <Text style={styles.iconLabels}>Add Item</Text>
                </View>
                <View style={{flex: 1, position: 'absolute', bottom:60, alignItems: 'center', left:SCREEN_WIDTH * 0.41 + 100}}>
                  <Icon
                      onPress={() => { Actions.recipes(); this.setButtonModalVisible(false); }}
                      reverse
                      raised
                      size={24}
                      name='silverware-fork-knife'
                      type='material-community'
                      color='#457ABE'
                  />
                  <Text style={styles.iconLabels}>Recipes</Text>
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
                 value={this.state.addedItem.Name}
                 onChangeText={this.addItemNameChanged.bind(this)}
                 />
                 <Input
                 label="Quantity"
                 placeholder="100"
                 value={this.state.addedItem.Quantity}
                 onChangeText={this.addItemQuantityChanged.bind(this)}
                 />
                 <Input
                 label="Expiration Date"
                 placeholder="10/27/2029"
                 value={this.state.addedItem.Expiration_Date}
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
    bottom:10,
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
  },
  iconLabels: {
    color: 'white',
    textAlign: 'center'
  }
});
