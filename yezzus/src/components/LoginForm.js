import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Header, Button, Input } from 'react-native-elements';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner } from './common';

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
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
      title='Login'
      titleStyle={{ fontSize: 20 }}
      buttonStyle={{
        width: 300,
        height: 45
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
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{ text: 'myKitchen',
          style: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold'
          }
        }}
          containerStyle={{ height: 85 }}
        />
        <Input
          label="Email"
          placeholder="email@gmail.com"
          leftIcon={{ type: 'entypo', name: 'email' }}
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          containerStyle={{ marginLeft: 10, marginTop: 20 }}
        />
        <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          leftIcon={{ type: 'entypo', name: 'lock' }}
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          containerStyle={{ marginLeft: 10 }}
        />
        {this.renderError()}

        {this.renderButton()}

        <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          textDecorationLine: 'underline'
        }}
        onPress={Actions.acctCreate}
        >
          Create Account
        </Text>
      </View>
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
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
