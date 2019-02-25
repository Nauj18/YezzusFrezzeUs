import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { emailChanged, passwordChanged, createUser } from '../actions';

class NewAcctForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.createUser({ email, password });
  }


  renderButton() {
    return (
      <Button
      title='New Account'
      titleStyle={{ fontSize: 20 }}
      buttonStyle={{
        width: 300,
        height: 45,
        backgroundColor: '#457ABE'
      }}
      containerStyle={{
        alignItems: 'center',
        marginTop: 15
       }}
      onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    const { goBack } = this.props.navigation;

    return (
      <ImageBackground
      source={require('../../assets/foodies.jpg')}
      style={{ height: '100%', width: '100%' }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
          style={{ fontSize: 50, fontWeight: 'bold', color: 'white' }}
          >
          Create User
          </Text>
          <Input
            label="Full Name"
            placeholder="John Doe"
            containerStyle={{ marginLeft: 10 }}
            inputContainerStyle={{ backgroundColor: 'white', height: 50 }}
            labelStyle={{ fontSize: 35, color: 'white' }}
          />
          <Input
            label="Email"
            placeholder="email@gmail.com"
            leftIcon={{ type: 'entypo', name: 'email' }}
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            containerStyle={{ marginTop: 15 }}
            inputContainerStyle={{ backgroundColor: 'white', height: 50 }}
            labelStyle={{ fontSize: 35, color: 'white' }}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            leftIcon={{ type: 'entypo', name: 'lock' }}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            containerStyle={{ marginTop: 15 }}
            inputContainerStyle={{ backgroundColor: 'white', height: 50 }}
            labelStyle={{ fontSize: 35, color: 'white' }}
          />
          {this.renderError()}

          {this.renderButton()}

          <Button
          title='Back'
          titleStyle={{ fontSize: 20 }}
          buttonStyle={{
            width: 300,
            height: 45,
            backgroundColor: '#457ABE'
          }}
          containerStyle={{
            alignItems: 'center',
            marginTop: 15
          }}
          onPress={() => goBack()}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error } = auth;

  return { email, password, error };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, createUser
})(NewAcctForm);
