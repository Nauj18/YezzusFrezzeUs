import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Modal, Alert } from 'react-native';
import { Header, Icon, Button, Input, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import Items from './Items.json';

export default class ViewInventory extends Component {
  state = {
    data: [],
    checked: [],
    modalVisible: false,
  };

  componentWillMount(){
    this.fetchData();
  }

  fetchData = async() => {
    const data = [];
    Items.Location.Fridge.forEach(element => {
      data.push({ name: element.Name, expDate: element.Expiration_Date });
    });
    Items.Location.Pantry.forEach(element => {
      data.push({ name: element.Name, expDate: element.Expiration_Date });
    });
    this.setState({ data });
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  setModalVisible(visible) {
  this.setState({ modalVisible: visible });
}

  deleteItem(item, index){
    const data = this.state.data;
    const checked = this.state.checked;
    data.splice(index, 1);
    checked.splice(index, 1);
    this.setState({ data, checked });
  }

  renderRow(item, index) {
    const swipeButtons = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => {
        this.deleteItem(item, index);
      }
    }];
    return (
      <Swipeout
      right={swipeButtons}
        autoClose={true}
        backgroundColor='transparent'
      >
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.containerStyle}>
            <View>
              <Card
              title="EDIT ITEM"
              style={{ justifyContent: 'center' }}
              >
                <Input
                label="Food"
                value={item.name}
                />
                <Input
                label="Expiration Date"
                value={item.expDate}
                />
                <Button
                  onPress={() => {
                    console.log('ITEM CHANGED');
                  }}
                  title='EDIT ITEM'
                  titleStyle={{ fontSize: 20 }}
                  buttonStyle={styles.buttonStyle}
                />
                <Button
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  title='CLOSE'
                  titleStyle={{ fontSize: 20 }}
                  buttonStyle={styles.buttonStyle}
                />
              </Card>
            </View>
          </View>
        </Modal>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          >
            <Text style={styles.item}>
            {item.name}
            </Text>
            <Text style={styles.item}>
            {item.expDate}
            </Text>
            <Icon
            name='more-vert'
            onPress={() => {
              this.setModalVisible(true);
            }}
            />
          </View>
        </Swipeout>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff', onPress: () => Actions.main() }}
          centerComponent={{ text: 'INVENTORY LIST',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }}
          rightComponent={{ icon: 'list', color: '#fff', onPress: () => Actions.shopList() }}
          containerStyle={{
            height: 85,
            justifyContent: 'space-around'
          }}
        />
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
        <Text
        style={styles.itemHead}
        >
        Food
        </Text>
        <Text
        style={styles.itemHead}
        >
        Expiration Date
        </Text>
        <Icon
          name='add'
          size={30}
          containerStyle={{
            paddingLeft: 6,
            paddingTop: 5
          }}
          onPress={Actions.addInvList}
        />
        </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            extraData={this.state}
            renderItem={({ item, index }) => this.renderRow(item, index)}
          />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1
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
  }
});
