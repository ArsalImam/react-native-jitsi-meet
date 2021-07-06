import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import CommonStyles from '../../CommonStyles';
import {Item, Input, Container, Icon, Toast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';
import {ViewUtils} from '../../Utils';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {Roles} from '../../Configs';

class Login extends Component {
  state = {email: '', password: '', showLoader: false, hidePassword: true};

  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  showLoader = () => {
    this.setState({showLoader: true});
  };

  componentDidMount() {
    try {
      AsyncStorage.getItem('@user').then(token => {
        console.log('token', token);
        if (token) {
          console.log('token =====>', token);
          this.props.navigation.replace('MyDrawer');
        } else {
          console.log('error', error);
        }
      });
    } catch (error) {
      console.log('Err', error);
    }
  }

  _submitForm = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;
    if (this.state.email.trim() == '' && this.state.password.trim() == '') {
      ViewUtils.showToast('Please Provide Email and Password');
      return;
    } else if (this.state.email.trim() == '') {
      ViewUtils.showToast('Please Provide Email');
      return;
    } else if (this.state.password.trim() == '') {
      ViewUtils.showToast('Please Provide Password');
      return;
    }

    this.showLoader();
    Api.instance()
      .login(this.state.email, this.state.password)
      .then(data => {
        console.log('User rolee  =>', data.user.role);
        if (data.user.role == Roles.assistant) {
          console.log('user role is assistant');
          ViewUtils.showToast('Invalid Credentials.');
        } else {
          this.props.navigation.replace('MyDrawer', {user: data.user});
        }
      })
      .catch(err => {
        console.log('er', err);
        ViewUtils.showToast('Invalid Credentials.');
      })
      .finally(() => {
        this.setState({showLoader: false});
      });
  };

  render() {
    return (
      <View style={[CommonStyles.container]}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={[CommonStyles.container]}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage, {marginBottom: -45,}]}
            source={require('../../assets/img/splash.png')}>
            <View
              style={[
                CommonStyles.container,
                {margin: 30, justifyContent: 'center', paddingTop: '30%'},
              ]}>
              <View>
                <Item regular style={CommonStyles.loginItemStyle}>
                  <Input
                    value={this.state.email}
                    onChangeText={username => this.setState({email: username})}
                    name="username"
                    placeholder={'Email Address Or Phone number'}
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
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    secureTextEntry={this.state.hidePassword}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    autoCapitalize="none"
                    returnKeyType="done"
                    selectionColor="#fff"
                    autoCompleteType="password"
                    textContentType="password"
                    name="password"
                    placeholder={'Password'}
                    placeholderTextColor="#FFF"
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                  <Icon
                    onPress={() => this.setPasswordVisibility()}
                    name="eye"
                    style={{color: '#fff', position: 'absolute', right: 5}}
                  />
                </Item>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>

        <View
          style={[
            CommonStyles.fitToBottom,
            CommonStyles.horizontalContainer,
            {
              backgroundColor: '#eee',
              borderTopRightRadius: 5,
              borderTopStartRadius: 5,
            },
          ]}>
          <TouchableOpacity
            style={[
              CommonStyles.container,
              CommonStyles.centerText,
              {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
            ]}
            onPress={this._submitForm}>
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeNormal,
                CommonStyles.centerText,
                CommonStyles.margin,
                CommonStyles.padding,
                {opacity: 0.5},
              ]}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[CommonStyles.container, CommonStyles.centerText]}
            onPress={() => {
              this.props.navigation.navigate('Create');
            }}>
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeNormal,
                CommonStyles.centerText,
                CommonStyles.margin,
                CommonStyles.padding,
                {opacity: 0.5},
              ]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        <Loader loading={this.state.showLoader} />
      </View>
    );
  }
}

export default Login;
