import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Input } from 'react-native-elements';
import { Spinner } from '../../components/common';


class deviceMan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceKey: '012345'
    };
  }

  // applyTextChange = (text) => {
  //   this.setState(previousState => (
  //     { deviceKey: text }
  //   ))
  // };

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
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff', onPress: () => Actions.main() }}
          centerComponent={{ text: 'Settings',
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

export default deviceMan;
