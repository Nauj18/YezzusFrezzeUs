import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Input, SocialIcon } from 'react-native-elements';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  facebookLogin,
} from '../actions';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }


  renderButton() {
    return (
      <Button
      title='Login'
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
    return (
      <ImageBackground
        source={require('../../assets/foodies.jpg')}
        style={{ height: '100%', width: '100%', resizeMethod: 'scale' }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableHighlight onPress={Actions.mainInventory}>
            <Image
            source={require('../../assets/myKitchen.png')}
            style={{ height: 120 }}
            resizeMode='contain'
            />
          </TouchableHighlight>
          <Input
            label="Email"
            placeholder="pineapple@gmail.com"
            leftIcon={{ type: 'entypo', name: 'email' }}
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            inputContainerStyle={{ backgroundColor: 'white', height: 50 }}
            containerStyle={{ marginTop: 15 }}
            labelStyle={{ fontSize: 35, color: 'white' }}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            leftIcon={{ type: 'entypo', name: 'lock' }}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            inputContainerStyle={{ backgroundColor: 'white', height: 50 }}
            containerStyle={{ marginTop: 15 }}
            labelStyle={{ fontSize: 30, color: 'white' }}
          />
          {this.renderError()}

          {this.renderButton()}

          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
            style={{
              width: 300,
              height: 45,
            }}
            onPress={facebookLogin()}
          />

          <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            textDecorationLine: 'underline',
            paddingTop: 10
          }}
          onPress={Actions.acctCreate}
          >
            Create Account
          </Text>
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
  emailChanged, passwordChanged, loginUser
})(LoginForm);
