import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  StatusBar,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import {Item, Input, Container} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';
import {ViewUtils} from '../../Utils';

class Login extends Component {
  state = {email: '', password: ''};

  constructor () {
    super ();
  }

  componentDidMount () {}

  _submitForm = () => {
    Api.instance ()
      .login (this.state.email, this.state.password)
      .then (data => {
        this.props.navigation.navigate ('MyDrawer', {user: data.user});
      })
      .catch (err => {
        ViewUtils.showToast (err);
      })
      .finally(() => {
        //hide loader
      });
  };

  render () {
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require ('../../assets/img/loginbg.png')}
        >
          <KeyboardAwareScrollView style={CommonStyles.container}>
            <View
              style={[
                CommonStyles.margin,
                {paddingTop: 30, paddingHorizontal: 10},
              ]}
            >
              <Text
                style={[
                  CommonStyles.fontMedium,
                  {
                    fontSize: 32,
                    color: '#FFF',
                  },
                ]}
              >
                Welcome {'\n'}to TeleMedicine
              </Text>
              <Text
                style={[
                  CommonStyles.textSizeAverage,
                  CommonStyles.textColorWhite,
                  {marginTop: 5},
                ]}
              >
                Please enter your details to get the latest
                {'\n'}
                information about your health and consult with
                {'\n'}
                your doctorrightaway !!!
              </Text>
              <Image
                style={[CommonStyles.mt10, {width: 96, height: 123}]}
                source={require ('../../assets/img/layer_2.png')}
              />
              <View style={[CommonStyles.mt10]}>
                <Item regular style={CommonStyles.loginItemStyle}>
                  <Input
                    value={this.state.email}
                    onChangeText={username => this.setState ({email: username})}
                    name="username"
                    placeholder={'Email Address'}
                    placeholderTextColor="#FFF"
                    returnKeyType="next"
                    autoCapitalize="none"
                    selectionColor="#fff"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>
                <Item
                  regular
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}
                >
                  <Input
                    value={this.state.password}
                    onChangeText={password => this.setState ({password})}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="done"
                    selectionColor="#fff"
                    autoCompleteType="password"
                    textContentType="password"
                    name="password"
                    placeholder={'Password'}
                    placeholderTextColor="#FFF"
                    passwordRules
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>

        <View
          style={[
            CommonStyles.fitToBottom,
            CommonStyles.horizontalContainer,
            {
              backgroundColor: '#eee',
              borderTopRightRadius: 5,
              borderTopStartRadius: 5,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              CommonStyles.container,
              CommonStyles.centerText,
              {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
            ]}
            onPress={this._submitForm}
          >
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeNormal,
                CommonStyles.centerText,
                CommonStyles.margin,
                CommonStyles.padding,
                {opacity: 0.5},
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[CommonStyles.container, CommonStyles.centerText]}
            onPress={this._submitForm}
          >
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeNormal,
                CommonStyles.centerText,
                CommonStyles.margin,
                CommonStyles.padding,
                {opacity: 0.5},
              ]}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
