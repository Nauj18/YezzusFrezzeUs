import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Input } from 'react-native-elements';
import { Spinner } from '../../components/common';

class deviceMan extends Component {
  applyPress = () => {
    const { goBack } = this.props.navigation;
    console.log('Success');
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
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => goBack() }}
          centerComponent={{ text: 'Connect', style: { color: '#fff' } }}
        />
        <Input
          label="SSID"
          placeholder="Wifi Name"
          onChange={this.handleChange}
          value={this.props.device}
          containerStyle={{ marginLeft: 10 }}
        />

        <Input
          label="Password"
          placeholder="Password"
          onChange={this.handleChange}
          value={this.props.device}
          containerStyle={{ marginLeft: 10 }}
        />
        {this.renderButton()}
      </View>
    );
  }
}

export default deviceMan;
