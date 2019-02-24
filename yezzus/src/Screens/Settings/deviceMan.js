import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Button, Input } from 'react-native-elements';
import { Spinner } from '../../components/common';


class deviceMan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceKey: '012345'
    };
  }

  applyPress = () => {
    const { goBack } = this.props.navigation;
    console.log(this.state.deviceKey);
    goBack();
  };

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
      title='Register Device'
      titleStyle={{ fontSize: 20 }}
      buttonStyle={{
        width: 300,
        height: 45
      }}
      containerStyle={{
        alignItems: 'center',
        marginTop: 15
       }}
       onPress={this.applyPress}
      />
    );
  }


  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => goBack() }}
          centerComponent={{ text: 'Device Manager',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }}
        />
        <Input
          label="Access Code"
          value={this.state.deviceKey}
          onChangeText={(deviceKey) => this.setState({deviceKey})}
          containerStyle={{ marginLeft: 10 }}
        />

        {this.renderButton()}
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
export default deviceMan;
