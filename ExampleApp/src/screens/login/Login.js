import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,  
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import { Item, Input, Container, Icon,Toast } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';
import { ViewUtils } from '../../Utils';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';


class Login extends Component {
  state = { email: '', password: '', showLoader: false, hidePassword: true };

  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this);
  }

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  showLoader = () => {
    this.setState({ showLoader: true });
  };

  componentDidMount() { }

  componentWillMount() {
    AsyncStorage.getItem('@user').then(token => {
      console.log('token', token);
      if (token) {
        console.log('token', token);
        this.props.navigation.replace('MyDrawer');
   
      } else {
        console.log('error', error);
      }
    });
  }
  _submitForm = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;
    if(this.state.email.trim() == '' && this.state.password.trim() == ''){
      ViewUtils.showToast(
        'Please Provide Email and Password',
    );
    return;
    }else if(this.state.email.trim() == ''){
      ViewUtils.showToast(
        'Please Provide Email',       
    );
    return;
    }else if(this.state.password.trim() == ''){
      ViewUtils.showToast(
        'Please Provide Password',       
    );
    return;
    }
    
    this.showLoader();
      Api.instance()
      .login(this.state.email, this.state.password)
      //.login(this.state.email, this.state.password)
      .then(data => {
        this.props.navigation.replace('MyDrawer', { user: data.user });
      })
      .catch(err => {
        console.log('er' ,err)
        //ViewUtils.showToast(err);
        ViewUtils.showToast(
          'Invalid Credentials.',       
      );
      })
      .finally(() => {
        this.setState({ showLoader: false });
      });

  };

  render() {
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/newloginbg.png')}>
          <KeyboardAwareScrollView style={CommonStyles.container}>
            <View style={[CommonStyles.margin, { margin: 30 }]}>
              <View
                style={[
                  CommonStyles.container,
                  { marginTop: 220, marginBottom: 5, justifyContent: 'center' },
                ]}>
                <Text
                  style={[
                    CommonStyles.fontMedium,
                    {
                      fontSize: 20,
                      color: '#FFF',
                    },
                  ]}>
                  Welcome to
                </Text>
                <View
                  style={[
                    CommonStyles.horizontalContainer,
                    
                  ]}>
                  <Text
                    style={[
                      CommonStyles.fontMedium,
                      {
                        fontSize: 20,
                        color: '#FFF',
                        
                      },
                    ]}>Professor Dr. A. H. Aamir
                  </Text>
                </View>
                <View
                  style={[
                    CommonStyles.container,
                    CommonStyles.horizontalContainer,
                    {  justifyContent: 'flex-start' },
                  ]}>
                  <Text
                    style={[
                      CommonStyles.fontMedium,
                      {
                        fontSize: 16,
                        color: '#bfbfbf',
                        
                      },
                    ]}>TeleClinic
                  </Text>
                </View>
       
           
              </View>
              <View style={{marginTop: 145}}>
                <View>
                <Item regular style={CommonStyles.loginItemStyle}>
                  <Input
                    value={this.state.email}
                    onChangeText={username => this.setState({ email: username })}
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
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    secureTextEntry={this.state.hidePassword}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
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
                    style={{ color: '#fff', position: 'absolute', right: 5 }}
                  />
                </Item>
              </View>

              <View>
                <View style={{width: 60, height: 20}}>
                  <Image
                    style={[
                      CommonStyles.mt10,
                      CommonStyles.container,
                      CommonStyles.backgroundImage,
                      { width: '100%', height: '100%' },
                    ]}
                    source={require('../../assets/img/etiblogo.png')}
                  />
                </View>             
              </View>
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
          ]}>
          <TouchableOpacity
            style={[
              CommonStyles.container,
              CommonStyles.centerText,
              { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
            ]}
            onPress={this._submitForm}>
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeNormal,
                CommonStyles.centerText,
                CommonStyles.margin,
                CommonStyles.padding,
                { opacity: 0.5 },
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
                { opacity: 0.5 },
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
