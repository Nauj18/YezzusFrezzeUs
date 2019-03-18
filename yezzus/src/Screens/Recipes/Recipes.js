import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, Header } from 'react-native-elements';

export default class Recipes extends Component {
  state = {
    modalVisible: true,
  };

    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }

    render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'RECIPES',
              style: {
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Helvetica'
              }
            }}
            leftComponent={{ icon: 'home', color: '#fff', onPress: () => Actions.mainInventory() }}
            rightComponent={{ icon: 'settings', color: '#fff', onPress: () => Actions.settings() }}
            containerStyle={{
              height: 85,
              justifyContent: 'space-around',
              backgroundColor: '#457ABE'
            }}
          />
          <Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={styles.containerStyle}>
              <Card
              title="SELECT ITEMS"
              style={{ justifyContent: 'center' }}
              >
              <Text>ITEMS WILL BE HERER</Text>
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title='SEARCH'
                titleStyle={{ fontSize: 20 }}
                buttonStyle={styles.buttonStyle}
              />
              </Card>
            </View>
          </Modal>

          <View
          styles={{       
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch'
          }}>
            <Button
              onPress={() => {
                this.setModalVisible(true);
              }}
              title='ITEMS'
              titleStyle={{ fontSize: 20 }}
              buttonStyle={styles.buttonStyle}
            />
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
     modalText: {
       fontSize: 60,
       padding: 20,
       marginTop: 20,
       marginBottom: 20,
       fontWeight: 'bold',
       alignSelf: 'center',
       alignItems: 'center'
     },
    containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
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
