import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { emailChanged, passwordChanged, createUser } from '../actions';
import { Spinner } from './common';

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
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
      title='New Account'
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
        <Input
          label="Full Name"
          placeholder="John Doe"
          containerStyle={{ marginLeft: 10 }}
        />
        <Input
          label="Email"
          placeholder="email@gmail.com"
          leftIcon={{ type: 'entypo', name: 'email' }}
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          containerStyle={{ marginLeft: 10 }}
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
  emailChanged, passwordChanged, createUser
})(NewAcctForm);
