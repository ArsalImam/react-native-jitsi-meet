import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList , Image} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import { Configs } from '../../Configs';

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
      { name: 'Lucas Simoes',  route: '' },
      { name: 'Mangus Kekhu', route: '' },
      { name: 'Shen ', route: '' },
      { name: 'Mehmet Seluri', route: '' },
      { name: 'Conan Matusov', route: '' },
      { name: 'Frank Boehm', route: '' },
      { name: 'Ivan Morais', route: '' },
      { name: 'Lucas Simoes',  route: '' },
      { name: 'Mangus Kekhu', route: '' },
      { name: 'Shen ', route: '' },
      { name: 'Mehmet Seluri', route: '' },
    ];

    return (
      <View style={[CommonStyles.container]}>

        <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>

          <View style={[CommonStyles.container,
          CommonStyles.padding,
          { paddingHorizontal: 15, marginTop: '15%' }
          ]}>

            <Text style={{ color: '#FFFFFF', }}>
              <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge,]} >{`Patients\n`}</Text>
              <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all booking patients </Text>
            </Text>

            <FlatGrid
              itemDimension={320}
              items={main}
              style={[CommonStyles.container, { marginTop: '9%'}]}
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
                          CommonStyles.fontBold,
                          CommonStyles.textSizeAverage,

            
                          CommonStyles.padding,

                          { color: '#333333'  },
                        ]}>
                        {item.name}
                      </Text>
                    
                  </View>
                </View>
              )}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}



// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   StatusBar,
//   Image,
// } from 'react-native';
// import { FlatGrid } from 'react-native-super-grid';
// import { ListItem, CheckBox, Divider } from 'react-native-elements';
// import  CommonStyles  from '../../CommonStyles';

// export default class Patients extends Component {
//   constructor() {
//     super();
//     this.state = {
//       checked: true,
//     };
//   }

//   render() {
//     const main = [
//       { name: 'Conan Matusov', code: '#9ed75f', route: '' },
//       { name: 'Frank Boehm', code: '#9ed75f', route: '' },
//       { name: 'Ivan Morais', code: '#9ed75f', route: '' },
//       { name: 'Lucas Simoes', code: '#9ed75f', route: '' },
//       { name: 'Mangus Kekhu', code: '#9ed75f', route: '' },
//       { name: 'Shen ', code: '#9ed75f', route: '' },
//       { name: 'Mehmet Seluri', code: '#9ed75f', route: '' },
//     ];
//     return (
//       <View style={[CommonStyles.container]}>
//         <ImageBackground
//           style={[CommonStyles.container, CommonStyles.backgroundImage]}
//           source={require('../../assets/drawable-xhdpi/bwback.png')}>
//           <View style={styles.View3}>
//             <Text
//               numberOfLines={3}
//               style={{ color: '#fff', marginHorizontal: '7%', marginBottom: 15 }}>
//               <Text
//                 style={[
//                   CommonStyles.DINAltBold,
//                   CommonStyles.textSizeLarge,
//                   { lineHeight: 28 },
//                 ]}>{`Patients\n`}</Text>
//               <Text
//                 style={[
//                   CommonStyles.SFProLight,
//                   CommonStyles.textSizeSmall,
//                   { lineHeight: 16 },
//                 ]}>
//                 It is a list of your all booking patients{' '}
//               </Text>
//             </Text>
//           </View>

//           <View style={styles.View2}>
//             <FlatGrid
//               itemDimension={320}
//               items={main}
//               style={styles.gridView}
//               //staticDimension={300}
//               //fixed
//               spacing={15}
//               renderItem={({ item, index }) => (
//                 <View style={[styles.itemContainer, { flexDirection: 'row' }]}>
//                   <View style={{ width: 50, marginHorizontal: 8, marginTop: -7, marginBottom: 8 }}>
//                     <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/drawable-xxxhdpi/Rectangle.png')}>
//                     </Image>
//                   </View>
//                   {/* */}

//                   <View style={[styles.view1, {}]}>
//                     <Text>
//                       {/* <Text style={[CommonStyles.DINProLight, CommonStyles.textSizeSmall, { color: '#333333', lineHeight: 16 }]}>{`Patient Name\n`}</Text> */}
//                       <Text
//                         style={[
//                           CommonStyles.DINAltBold,
//                           CommonStyles.textSizeAverage,
//                           { color: '#333333', lineHeight: 20 },
//                         ]}>
//                         {item.name}
//                       </Text>
//                     </Text>
//                   </View>
//                 </View>
//               )}
//             />
//           </View>
//         </ImageBackground>
//       </View>
//     );
//   }
// }

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
