import React, { Component } from 'react';
import { AppRegistry, ScrollView, Picker, StyleSheet, View, FlatList, Text, TextInput, Modal, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { Header, CheckBox, Icon, Button, Input, Card, ButtonGroup, ListItem} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import { Font } from 'expo';
import firebase from 'firebase';
import Items from './ShoppingList.json';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class MainInventory extends Component {

  constructor() {
    super()
    this.state = {
        data: [],
        checked: [],
        quantityModalVisible: false,
        addModalVisible: false,
        itemIndex: 0,
        addedItem: {name: "", quantity: "", key: ""},
        fontLoaded: false,
        uID: '',
    }
  }

  async componentWillMount(){
    await Font.loadAsync({
      'Helvetica': require('../../../assets/fonts/Helvetica.ttf'),
    });

    this.setState({ fontLoaded: true });
    await this.fetchData();
  }

  async fetchData() {
    const uID = firebase.auth().currentUser.uid;
    this.setState({ uID });
    let data = [];
    await firebase.database().ref().child(uID + "/ShoppingList").once("value", snapshot => {
      const fbData = snapshot.val();
      if (fbData) {
        Object.keys(fbData).forEach(item =>
          firebase.database().ref().child(uID + "/ShoppingList/" + item).once("value", snapshot => {
            const nameData = snapshot.val();
            data.push({ name: nameData.Name, quantity: nameData.Quantity, key: item});
            this.setState({ data });
          })
        );
      }
    });
  }

  setQuantityModalVisible(quantityModalVisible, itemIndex) {
    this.setState({ quantityModalVisible, itemIndex });
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

  changeCheckBox = (index) => {
    let checked = this.state.checked;
    checked[index] = !checked[index];
    this.setState({ checked });
  }

  itemChanged(newItem, index){
    let data = this.state.data;
    data[index].name = newItem;
    this.setState({ data });
    firebase.database().ref(this.state.uID + "/ShoppingList/" + data[index].key + "/").update({
      Name: `${newItem}`,
    });
  }

  quantityChanged(val, index){
    let data = this.state.data;
    data[index].quantity = val;
    this.setState({ data })
    firebase.database().ref(this.state.uID + "/ShoppingList/" + data[index].key + "/").update({
      Quantity: `${val}`,
    });
  }

  clearChecked(){
      let checked = this.state.checked;
      let data = this.state.data;
      let ind = 0;

      for (let i = 0; i < checked.length; i++){
        if(checked[i] == true){
          firebase.database().ref(this.state.uID + "/ShoppingList/" + data[ind].key + "/").remove();
          data.splice(ind, 1);
        }
        else ind++
      }
      this.setState({ data, checked:[] });
  }

  deleteItem(item, index){
    let data = this.state.data;
    let checked = this.state.checked;
    firebase.database().ref(this.state.uID + "/ShoppingList/" + data[index].key + "/").remove();
    data.splice(index, 1);
    checked.splice(index, 1);
    this.setState({ data, checked });
  }

  async addNewItem() {
    await firebase.database().ref(this.state.uID + "/ShoppingList/").push({
      Name: `${this.state.addedItem.name}`,
      Quantity: `${this.state.addedItem.quantity}`
    }).then((result)=>{
      this.state.addedItem.key = result.key;
    });
    let data = [];
    data.push(this.state.addedItem);
    this.state.data.forEach(element => {
      data.push(element);
    });
    let checked = [false];
    this.state.checked.forEach(element => {
      checked.push(element);
    });
    this.setState({ data, checked });
  }

  renderCard(item, index){
    let numbers = [];
    for(let i = 1; i < 101; i++){
        numbers.push(i.toString());
    }
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
        <Card>
        <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
                <CheckBox
                containerStyle={{padding: 0, margin:0}}
                left
                onPress={() => this.changeCheckBox(index)}
                checked={this.state.checked[index]} />
                

                <TextInput style={{fontSize: 17, marginLeft: 10, width: '70%'}} 
                editable = {true}
                value={item.name}
                onChangeText={(text) => {this.itemChanged(text, index)}}></TextInput>
            </View>
            <View>
                <TouchableOpacity style={styles.quantityButton}
                    onPress={() => this.setQuantityModalVisible(true, index)}>
                    <Text style={{alignSelf:'center', color:'white'}}>{item.quantity}</Text>
                </TouchableOpacity>
            
            </View>
            </View>
            <Modal
            animationType="fade"
            transparent
            visible={this.state.quantityModalVisible}>
            <View
                style={{ backgroundColor:'rgba(0, 0, 0, 0.7)', flex: 1, justifyContent: 'center', padding: 20, height: '40%' }}>
                <View style={{ borderRadius:10, alignItems: 'center', backgroundColor: '#fff', padding: 20, height: '40%' }}>
            <Picker
                selectedValue={this.state.data[this.state.itemIndex].quantity}
                style={{height: 50, width: "100%"}}
                onValueChange={(val) => this.quantityChanged(val, (this.state.itemIndex)) }>
                {numbers.map((item, ind) => {
                    return (<Picker.Item label={item} value={item} key={item}/>) })} 
                
            </Picker>
            </View>
            <Button
                onPress={() => { this.setQuantityModalVisible(false, this.state.itemIndex); }}
                title='DONE'
                titleStyle={{ fontSize: 20 }}
                buttonStyle={styles.buttonStyle}
            />
            </View>  
        </Modal>
        
        </Card>
        
        </Swipeout>
      )
  }

  render() {
    const { goBack } = this.props.navigation;
  
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'kitchen', color: '#fff', onPress: () => goBack() }}
          centerComponent={{ text: 'SHOPPING LIST',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }}
          rightComponent={{ icon: 'add', color: '#fff', onPress: () => this.setAddModalVisible(true) }}
          containerStyle={{
            height: 85,
            justifyContent: 'space-around',
            backgroundColor: '#457ABE'
          }}
        />
        <Button 
            onPress={() => { this.clearChecked();}}
            title='Clear Checked'
            titleStyle={{ fontSize: 20 }}
            buttonStyle={styles.clearButtonStyle}/>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            extraData={this.state}
            renderItem={({ item, index }) => this.renderCard(item, index)}
          />
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
                value={this.state.addedItem.name}
                onChangeText={this.addItemNameChanged.bind(this)}
                />
                <Input
                label="Quantity"
                value={this.state.addedItem.quantity}
                onChangeText={this.addItemQuantityChanged.bind(this)}
                />
                <Button
                    onPress={async () => {
                      this.setAddModalVisible(false);
                      await this.addNewItem();
                      this.setState({addedItem: {name: "", quantity: "", key: ""}});
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
  quantityButton: {   
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#457ABE', 
    borderRadius: 15, 
    height: 30, 
    width: 30, 
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1
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
    width: 100,
    height: 40,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#457ABE',
    bottom:0
  },
  clearButtonStyle: {
    width: "90%",
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    // alignItems: 'center',
    backgroundColor: '#457ABE',
    // top:0
  }
});