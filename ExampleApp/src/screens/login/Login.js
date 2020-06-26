import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import { Item, Input, Container } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';
import { ViewUtils } from '../../Utils';
import Loader from '../../components/Loader';

class Login extends Component {
  state = { email: '', password: '', showLoader: false };

  constructor(props) {
    super(props);
    this._submitForm = this._submitForm.bind(this)

  }

  showLoader = () => { this.setState({ showLoader: true }); };
  //showLoader = () => { this.setState({ showLoader: true }); };

  componentDidMount() { }

  _submitForm = () => {
    this.showLoader()

    Api.instance()
      .login(this.state.email, this.state.password)
      .then(data => {
        this.props.navigation.navigate('MyDrawer', { user: data.user });

      })
      .catch(err => {
        ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({ showLoader: false })
      });
  };

  render() {
    return (
      <View style={[CommonStyles.container]}>



        {/* {this.state.showLoader ? <View style={[CommonStyles.loaderContainer]} >
          <ActivityIndicator size="large" style={[CommonStyles.loaderIndicatorStyle]} />
        </View> : ( */}

        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/loginbg.png')}
        >
          <KeyboardAwareScrollView style={CommonStyles.container}>
            <View
              style={[
                CommonStyles.margin,
                { paddingTop: 30, paddingHorizontal: 10 },
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
                  { marginTop: 5 },
                ]}
              >
                Please enter your details to get the latest
                {'\n'}
                information about your health and consult with
                {'\n'}
                your doctorrightaway !!!
              </Text>
              <Image
                style={[CommonStyles.mt10, { width: 96, height: 123 }]}
                source={require('../../assets/img/layer_2.png')}
              />
              <View style={[CommonStyles.mt10]}>
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
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}
                >
                  <Input
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
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
              { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
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
                { opacity: 0.5 },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[CommonStyles.container, CommonStyles.centerText]}
          //  onPress={() => { this.props.navigation.navigate('MyDrawer') }}
          >
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeNormal,
                CommonStyles.centerText,
                CommonStyles.margin,
                CommonStyles.padding,
                { opacity: 0.5 },
              ]}
            >
              Create Account
            </Text>

          </TouchableOpacity>
        </View>


        <Loader
          loading={this.state.showLoader} />

        {/* <View style={{ position: 'absolute', top: "50%", right: 0, left: 0}}>
          <ActivityIndicator  animating={this.state.showLoader} size="large" color="#fff" />
        </View> */}

      </View>
    );
  }
}

export default Login;
