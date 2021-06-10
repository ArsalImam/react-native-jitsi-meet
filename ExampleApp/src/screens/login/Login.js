import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,Dimensions,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import { Item, Input, Container, Icon, Toast } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';
import { ViewUtils } from '../../Utils';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Roles } from '../../Configs';
const windowHeight = Dimensions.get('window').height;
let averageHeight = windowHeight/2+windowHeight*0.10
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

  componentDidMount() {

    console.log("windowHeight" , averageHeight)
    
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
      console.log("Err", error)
    }

  }

  // componentWillMount() {
  // AsyncStorage.getItem('@user').then(token => {
  //   console.log('token', token);
  //   if (token) {
  //     console.log('token =====>', token);
  //     this.props.navigation.replace('MyDrawer');

  //   } else {
  //     console.log('error', error);
  //   }
  // });
  // }
  _submitForm = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;
    if (this.state.email.trim() == '' && this.state.password.trim() == '') {
      ViewUtils.showToast(
        'Please Provide Email and Password',
      );
      return;
    } else if (this.state.email.trim() == '') {
      ViewUtils.showToast(
        'Please Provide Email',
      );
      return;
    } else if (this.state.password.trim() == '') {
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
        console.log("User rolee  =>", data.user.role)
        if (data.user.role == Roles.assistant) {
          console.log("user role is assistant")
          ViewUtils.showToast(
            'Invalid Credentials.',
          );
        }
        else {
          this.props.navigation.replace('MyDrawer', { user: data.user });
        }
      })
      .catch(err => {
        console.log('er', err)
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
        {/* <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/loginbg.png')}>
               </ImageBackground> */}
        <View style={[CommonStyles.container, { backgroundColor: "#6ED1F1" }]}>
          <KeyboardAwareScrollView style={[CommonStyles.container]}>
            <View style={[CommonStyles.container]}>
              <View style={[CommonStyles.container, { height: averageHeight ,width:'100%' ,marginTop:-10}]}>
                <Image
                  style={[CommonStyles.container, { resizeMode: 'cover', height:'100%', width: '100%' }]}
                  source={require('../../assets/img/loginbg.png')} />
              
              </View>
           
            <View style={[CommonStyles.container, { marginTop:'12%', marginHorizontal: 30 }]}>
              <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                <View
                >
                  <Item regular style={CommonStyles.loginItemStyle2}>
                    <Input
                      value={this.state.email}
                      onChangeText={username => this.setState({ email: username })}
                      name="username"
                      placeholder={'Email Address Or Phone number'}
                      placeholderTextColor="#0d252b"
                      returnKeyType="next"
                      autoCapitalize="none"
                      selectionColor="#0d252b"
                      autoCompleteType="email"
                      keyboardType="email-address"
                      style={[
                        CommonStyles.fontMedium,
                        CommonStyles.textColorWhite,
                        CommonStyles.textSizeNormal,
                        , { color: '#0d252b' }]}
                    />
                  </Item>
                  <Item
                    regular
                    style={[CommonStyles.loginItemStyle2, CommonStyles.mt10]}>
                    <Input
                      secureTextEntry={this.state.hidePassword}
                      value={this.state.password}
                      onChangeText={password => this.setState({ password })}
                      autoCapitalize="none"
                      returnKeyType="done"
                      selectionColor="#0d252b"
                      autoCompleteType="password"
                      textContentType="password"
                      name="password"
                      placeholder={'Password'}
                      placeholderTextColor="#0d252b"
                      style={[
                        CommonStyles.fontMedium,
                        // CommonStyles.textColorWhite,
                        CommonStyles.textSizeNormal,
                        , { color: '#0d252b' }]}
                    />
                    <Icon
                      onPress={() => this.setPasswordVisibility()}
                      name={this.state.hidePassword == true ? "eye-with-line" :"eye" }
                      style={{ color: '#0d252b', position: 'absolute', right: 5 }}
                      type="Entypo"
                    />
                  </Item>
                </View>
              </View>
            </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
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
                { opacity: 0.5, },
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



{/* <KeyboardAwareScrollView >
<View style={[CommonStyles.margin, { margin: 30 }]}>

  <View style={{justifyContent:'flex-end'   ,height:460  ,flex:1}}>
    <View 
    >
      <Item regular style={CommonStyles.loginItemStyle2}>
        <Input
          value={this.state.email}
          onChangeText={username => this.setState({ email: username })}
          name="username"
          placeholder={'Email Address'}
          placeholderTextColor="#0d252b"
          returnKeyType="next"
          autoCapitalize="none"
          selectionColor="#0d252b"
          autoCompleteType="email"
          keyboardType="email-address"
          style={[
            CommonStyles.fontMedium,
            CommonStyles.textColorWhite,
            CommonStyles.textSizeNormal,
            ,{color:'#0d252b'}]}
        />
      </Item>
      <Item
        regular
        style={[CommonStyles.loginItemStyle2, CommonStyles.mt10]}>
        <Input
          secureTextEntry={this.state.hidePassword}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          autoCapitalize="none"
          returnKeyType="done"
          selectionColor="#0d252b"
          autoCompleteType="password"
          textContentType="password"
          name="password"
          placeholder={'Password'}
          placeholderTextColor="#0d252b"
          style={[
            CommonStyles.fontMedium,
            // CommonStyles.textColorWhite,
            CommonStyles.textSizeNormal,
          ,{color:'#0d252b'}]}
        />
        <Icon
          onPress={() => this.setPasswordVisibility()}
          name="eye"
          style={{ color: '#0d252b', position: 'absolute', right: 5 }}
        />
      </Item>
    </View>

    <View>
     
      
    </View>
  </View>
</View>
</KeyboardAwareScrollView> */}




export default Login;
