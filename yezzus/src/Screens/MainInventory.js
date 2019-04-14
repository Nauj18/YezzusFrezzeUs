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
        selectedLocation: "Fridge",
        data: {},
        item: {},
        editedItem: {},
        editModalVisible: false,
        addModalVisible: false,
        buttonModalVisible: false,
        itemIndex: 0,
        firebaseItem: [],
        addedItem: { name: '', quantity: '', expDate: '' },
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
            selectedLocation = "Freezer";
            break;
        case 1:
            selectedLocation = "Fridge";
            break;
        case 2:
            selectedLocation = "Pantry";
            break;
        default:
            break;
    }
    this.setState({selectedIndex, selectedLocation})
  }

  async componentDidMount() {
    //Font load
    await Font.loadAsync({
      'Helvetica': require('../../assets/fonts/Helvetica.ttf'),
    });
    this.setState({ fontLoaded: true });

    //Grab all info from firebase
    // const uID = 
    // console.log("this worked! " + uID);
    await this.fetchData();
  }

  async fetchData() {
    const uID = await firebase.auth().currentUser.uid;
    console.log("Hi Davis! The uID is: " + uID);

    const fdata = {
      fridge: [],
      freezer: [],
      pantry: []
    };

    /***********************************************
     *This is where the fridge inventory is filled
     ***********************************************/
    const fridgeArryName = [];
    const fridgeArryExpDt = [];
    const fridgeArryQty = [];
    firebase.database().ref().child(uID + "/Location/Fridge").once("value", snapshot => {
      const Firebasedata = snapshot.val()
      if (Firebasedata) {

        //Grabs the name of all the items
        Object.keys(Firebasedata).forEach(fridgeItem =>
          firebase.database().ref().child(uID + "/Location/Fridge/" + fridgeItem + "/Name").once("value", snapshot => {
            const nameData = snapshot.val();
            console.log(nameData);
            fridgeArryName.push(nameData);
            // this.setState({
            //   litName: fridgeArryName
            // });
            //console.log("Printing the item names: " + this.state.litName);

          })
        );
        console.log("Hello davis here is the fridge array of names: ")
        console.log(fridgeArryName);
        
        //Grabs the expiration date for all items
        Object.keys(Firebasedata).forEach(fridgeItem =>
          firebase.database().ref().child(uID + "/Location/Fridge/" + fridgeItem + "/Expiration_Date").once("value", snapshot => {
            const expData = snapshot.val();
            //console.log(expData);
            fridgeArryExpDt.push(expData);
            // this.setState({
            //   litExpDate: fridgeArryExpDt
            // });
          })
        );

        //Grabs the QTY information for all items
        Object.keys(Firebasedata).forEach(fridgeItem =>
          firebase.database().ref().child(uID + "/Location/Fridge/" + fridgeItem + "/Quantity").once("value", snapshot => {
            const expQty = snapshot.val();
            //console.log(expQty);
            fridgeArryQty.push(expQty);
            // this.setState({
            //   litQty: fridgeArryQty
            // });
          })
        );
        for (var i = 0; i < fridgeArryName.length; i++) {
          fdata.fridge.push({
            name: fridgeArryName[i],
            expDate: fridgeArryExpDt[i],
            quantity: fridgeArryQty[i]
          });
        }
      }
    });

    /***********************************************
     *This is where the freezer inventory is filled
     ***********************************************/
    const freezerArryName = [];
    const freezerArryExpDt = [];
    const freezerArryQty = [];
    firebase.database().ref().child(uID + "/Location/Freezer").once("value", snapshot => {
      const Firebasedata = snapshot.val()
      if (Firebasedata) {

        //Grabs the name of all the items
        Object.keys(Firebasedata).forEach(freezerItem =>
          firebase.database().ref().child(uID + "/Location/Freezer/" + freezerItem + "/Name").once("value", snapshot => {
            const nameData = snapshot.val();
            //console.log(nameData);
            freezerArryName.push(nameData);
            // this.setState({
            //   litName: freezerArryName
            // });
          })
        );

        //Grabs the expiration date for all items
        Object.keys(Firebasedata).forEach(freezerItem =>
          firebase.database().ref().child(uID + "/Location/Freezer/" + freezerItem + "/Expiration_Date").once("value", snapshot => {
            const expData = snapshot.val();
            //console.log(expData);
            freezerArryExpDt.push(expData);
            // this.setState({
            //   litExpDate: freezerArryExpDt
            // });
          })
        );

        //Grabs the QTY information for all items
        Object.keys(Firebasedata).forEach(freezerItem =>
          firebase.database().ref().child(uID + "/Location/Freezer/" + freezerItem + "/Quantity").once("value", snapshot => {
            const expQty = snapshot.val();
            //console.log(expQty);
            freezerArryQty.push(expQty);
            // this.setState({
            //   litQty: freezerArryQty
            // });
          })
        );

        //This loops through the array of names and assigns each a value
        for (var i = 0; i < freezerArryName.length; i++) {
          fdata.freezer.push({
            name: freezerArryName[i],
            expDate: freezerArryExpDt[i],
            quantity: freezerArryQty[i]
          });
        }
      }
    });

    /***********************************************
     *This is where the pantry inventory is filled
     ***********************************************/
    const pantryArryName = [];
    const pantryArryExpDt = [];
    const pantryArryQty = [];
    firebase.database().ref().child(uID + "/Location/Pantry").once("value", snapshot => {
      const Firebasedata = snapshot.val()
      if (Firebasedata) {

        //Grabs the name of all the items
        Object.keys(Firebasedata).forEach(pantryItem =>
          firebase.database().ref().child(uID + "/Location/Pantry/" + pantryItem + "/Name").once("value", snapshot => {
            const nameData = snapshot.val();
            //console.log(nameData);
            pantryArryName.push(nameData);
            //console.log("This should continously add the items: " + arryName);
            // this.setState({
            //   litName: pantryArryName
            // });
            //console.log("Printing the item names: " + this.state.litName);
          })
        );

        //Grabs the expiration date for all items
        Object.keys(Firebasedata).forEach(pantryItem =>
          firebase.database().ref().child(uID + "/Location/Pantry/" + pantryItem + "/Expiration_Date").once("value", snapshot => {
            const expData = snapshot.val();
            //console.log(expData);
            pantryArryExpDt.push(expData);
            // this.setState({
            //   litExpDate: pantryArryExpDt
            // });
          })
        );

        //Grabs the QTY information for all items
        Object.keys(Firebasedata).forEach(pantryItem =>
          firebase.database().ref().child(uID + "/Location/Pantry/" + pantryItem + "/Quantity").once("value", snapshot => {
            const expQty = snapshot.val();
            //console.log(expQty);
            pantryArryQty.push(expQty);
            // this.setState({
            //   litQty: pantryArryQty
            // });
          })
        );
        for (var i = 0; i < pantryArryName.length; i++) {
          fdata.pantry.push({
            name: pantryArryName[i],
            expDate: pantryArryExpDt[i],
            quantity: pantryArryQty[i]
          });
        }
        console.log("Curious to see what data looks like rn");
        console.log(fdata);
      }
    });



    this.setState({
      data: fdata
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
    //let data = {Fridge: [], Freezer: [], Pantry: []};
    let location = this.state.selectedLocation;
    let uID = firebase.auth().currentUser.uid;
    //data[location].push(this.state.addedItem);
    
    //This is the firebase call to add a new item to the firebase!
    const newItem = firebase.database().ref().child(uID + "/Location/" + location).push()
    newItem.set(this.state.addedItem, () => this.setState({
                                                            Name: this.state.addedItem.name,
                                                            Expiration_Date: this.state.addedItem.expDate,
                                                            Quantity: this.state.addedItem.quantity
                                                          }))

    // this.state.data[location].forEach(element => {
    //   data[location].push(element);
    // });
    // this.setState({ data });


    //This just resets the text box pretty much
    let addedItem = this.state.addedItem;
    addedItem.name = '';
    addedItem.expDate = '';
    addedItem.quantity = '';
    this.setState({addedItem});
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
              rightComponent={{ icon: 'settings', color: '#fff', onPress: () => Actions.settings() }}
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
