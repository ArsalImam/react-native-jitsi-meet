import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import { Configs } from '../../Configs';
import { Icon } from 'native-base';

export default class Patients extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      checked: true
    };
  }
  render() {
    const main = [
      { name: 'Conan Matusov', route: '' },
      { name: 'Frank Boehm', route: '' },
      { name: 'Ivan Morais', route: '' },
      { name: 'Lucas Simoes', route: '' },
      { name: 'Mangus Kekhu', route: '' },
      { name: 'Shen ', route: '' },
      { name: 'Mehmet Seluri', route: '' },
      { name: 'Conan Matusov', route: '' },
      { name: 'Frank Boehm', route: '' },
      { name: 'Ivan Morais', route: '' },
      { name: 'Lucas Simoes', route: '' },
      { name: 'Mangus Kekhu', route: '' },
      { name: 'Shen ', route: '' },
      { name: 'Mehmet Seluri', route: '' },
    ];

    return (
      <View style={[CommonStyles.container]}>

        <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>

          <View style={[CommonStyles.container,
          CommonStyles.padding,
          { marginTop: '15%' }
          ]}>

            <Text style={{ color: '#FFFFFF', paddingLeft: 15 }}>
              <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge,]} >{`Patients\n`}</Text>
              <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all booking patients </Text>
            </Text>

            <FlatGrid
              itemDimension={320}
              items={main}
              style={[CommonStyles.container, { marginTop: '9%' }]}
              //staticDimension={300}
              //fixed
              spacing={15}
              renderItem={({ item, index }) => (
                <View style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, { flexDirection: 'row', backgroundColor: '#FFF' }]}>
                  <View style={{ width: 50, marginHorizontal: 8, marginTop: -7, marginBottom: 8 }}>
                    <Image style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/drawable-xxxhdpi/Rectangle.png')}>
                    </Image>
                  </View>
                  {/* */}

                  <View style={[CommonStyles.container, CommonStyles.centerElement]}>

                    <Text
                      style={[
                        CommonStyles.fontMedium,
                        CommonStyles.textSizeNormal,
                        CommonStyles.padding,

                      ]}>
                      {item.name}
                    </Text>

                  </View>
                </View>
              )}
            />
          </View>

          <View
            style={[
              {
                position: 'absolute',
                left: 16,
                top: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
              <Icon name='arrow-back' type='MaterialIcons' style={{ fontSize: 26, color: '#FFF' }} />
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 60,
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
    borderRadius: 3,
    backgroundColor: '#FFF',
    shadowColor: '#000',
  },

  View3: {
    flex: 1.9,
    justifyContent: 'flex-end',
  },
  View2: {
    marginTop: 30,
    flex: 8,
    alignSelf: 'center',
    width: '94%',
  },
  view1: {
    height: '100%',
    width: '50%',
    justifyContent: 'space-evenly',
  },
});
