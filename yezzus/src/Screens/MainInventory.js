import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Modal, Alert, Dimensions, TouchableOpacity } from 'react-native';
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
        checked: [],
        editModalVisible: false,
        buttonModalVisible: false,
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
      data.fridge.push({ name: element.Name, expDate: element.Experation_Date, quantity: element.Quantity });
    });
    Items.Location.Freezer.forEach(element => {
        data.freezer.push({ name: element.Name, expDate: element.Experation_Date, quantity: element.Quantity });
      });
    Items.Location.Pantry.forEach(element => {
      data.pantry.push({ name: element.Name, expDate: element.Experation_Date, quantity: element.Quantity });
    });
    this.setState({ data });
  }

  setEditModalVisible(editModalVisible) {
    this.setState({ editModalVisible });
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
    let today = moment();
    let itemExp = moment(item.expDate, "MM/DD/YYYY");
    let result = itemExp.diff(today, 'days');

    if (result < 11) return `${item.name} • ${result} days left`;
    else return `${item.name}`;
  }

  deleteItem(item, index){
    const list = this.state.data[this.state.selectedLocation];
    list.splice(index, 1);
    let data = this.state.data;
    data[this.state.selectedLocation] = list;

    this.setState({ data });
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
        <TouchableOpacity onPress={() => { this.setEditModalVisible(true); }} >
        <Card
            title={this.getItemAndDaysLeft(item)}>
            <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
            <Text>
                Expires: {this.formatDate(item)}
            </Text>
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
            }}>
            <View style={styles.containerStyle}>
                <Card
                title="EDIT ITEM"
                style={{ justifyContent: 'center' }}>
                <Input
                label="Food"
                value={item.name}
                />
                <Input
                label="Experation Date"
                value={item.expDate}
                />
                <Button
                    onPress={() => {
                    console.log('ITEM EDITTED');
                    }}
                    title='EDIT ITEM'
                    titleStyle={{ fontSize: 20 }}
                    buttonStyle={styles.buttonStyle}
                />
                <Button
                    onPress={() => {
                    this.setEditModalVisible(!this.state.editModalVisible);
                    }}
                    title='CLOSE'
                    titleStyle={{ fontSize: 20 }}
                    buttonStyle={styles.buttonStyle}
                />
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
              fontWeight: 'bold'
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
                color='#d7dadd'
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
                    onPress={() => { Actions.shopList(); this.setButtonModalVisible(false); }}
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
                    onPress={() => { Actions.addInvList(); this.setButtonModalVisible(false); }}
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
                    onPress={() => { this.setButtonModalVisible(false); }}
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
