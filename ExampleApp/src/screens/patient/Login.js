import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, StatusBar } from 'react-native';
import CommonStyles from '../../CommonStyles';
import { Item, Input, Container, } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';

class Login extends Component {

    state = { email: '', password: '' };

    constructor() {
        super();
    }

    componentDidMount() {
    }

    _submitForm = () => {
        Api.instance()
            .login(this.state.email, this.state.password)
            .then(data => {
                this.props.navigation.navigate('MyDrawer', {user: data.user})
            })
            .catch(err => {
                console.warn(err);
                alert(err);
            });
    };

    render() {
        return (
            <Container style={[CommonStyles.container, { justifyContent: 'space-around', backgroundColor: '#297dec' }]}>
                <KeyboardAwareScrollView style={CommonStyles.container}>

                    <ImageBackground style={CommonStyles.backgroundImage}
                        source={require('../../assets/drawable-xhdpi/loginbg.png')}>
                        <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />


                        <View style={{
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 65,
                        }}>
                            <Text style={[CommonStyles.DINAltBold, {
                                fontSize: 32,
                                color: '#FFF',
                                lineHeight: 40
                            }]}>Welcome {'\n'}to TeleMedicine</Text>
                            <Text style={[CommonStyles.SFProLight, { fontSize: 14, lineHeight: 19, color: '#FFF', marginTop: 5 }]}>Please
                                    enter your details to get the latest{'\n'}information about your health and consult
                                    with{'\n'}your doctorrightaway !!!
                                </Text>

                            <Image style={{ width: 100, height: 128, marginTop: 15 }}
                                source={require('../../assets/drawable-xhdpi/layer_2.png')}>
                            </Image>

                            <View style={{
                                width: '100%',
                                height: 120,
                                justifyContent: 'space-between',
                                marginTop: 66,
                                //marginBottom: 240
                            }}>
                                <Item regular style={styles.itemStyle}>
                                    <Input value={this.state.email}
                                        onChangeText={username => this.setState({ email: username })}
                                        name='username'
                                        placeholder={'Email Address'}
                                        placeholderTextColor="#FFF"
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        selectionColor='#fff'
                                        autoCompleteType='email'
                                        keyboardType='email-address'
                                        style={[CommonStyles.DINProMedium, {
                                            fontSize: 15,
                                            lineHeight: 20,
                                            color: '#fff'
                                        }]} />
                                </Item>

                                <Item regular last style={styles.itemStyle}>
                                    <Input
                                        value={this.state.password}
                                        onChangeText={password => this.setState({ password })}
                                        secureTextEntry
                                        autoCapitalize='none'
                                        returnKeyType='done'
                                        selectionColor='#fff'
                                        autoCompleteType='password'
                                        textContentType='password'
                                        name='password' placeholder={'Password'} placeholderTextColor="#FFF"
                                        passwordRules style={[CommonStyles.DINProMedium, {
                                            fontSize: 15,
                                            lineHeight: 20,
                                            color: '#FFF'
                                        }]} />
                                </Item>
                            </View>
                        </View>
                    </ImageBackground>
                </KeyboardAwareScrollView>
                <View style={styles.buttonStyle}>
                    <TouchableOpacity style={{
                        width: '50%',
                        height: '100%',
                        justifyContent: "center",
                        borderTopRightRadius: 10,
                        borderColor: "#FFF",
                        borderRightWidth: 4,
                        borderTopEndRadius: 15,
                    }} onPress={this._submitForm}>
                        <Text
                            style={[styles.textStyle, CommonStyles.DINProRegular]}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '50%' }} onPress={() => this.props.navigation.replace('MyDrawer')}>
                        <Text style={[styles.textStyle, CommonStyles.DINProRegular]}>Create Account</Text>
                    </TouchableOpacity>

                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginHorizontal: 20,
        // backgroundColor: 'red',
        alignContent: 'center',
        width: '90%'
    },
    textStyle: {
        fontSize: 15,
        color: '#999999',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 8
    },
    itemStyle: {
        borderColor: '#C5D4E8',
        alignSelf: 'center',
        height: 52,
        borderRadius: 6,
        shadowColor: "#8BB3E9",
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    buttonStyle: {
        // position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        shadowColor: '#C3D9F0',
        shadowOffset: {
            width: 0,
            height: 2,
        },

        alignItems: 'center',
        shadowOpacity: 1.2,
        shadowRadius: 9,
        elevation: 3,
        backgroundColor: '#F7FAFE',
        borderWidth: 3,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderColor: '#fff',
        borderBottomWidth: 0,
        flexDirection: "row"
    },


    TextInput: {
        justifyContent: 'center',
        //top:270,
    },


})

export default Login;