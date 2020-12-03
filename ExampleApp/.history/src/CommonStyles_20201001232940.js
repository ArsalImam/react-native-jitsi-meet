import { StyleSheet } from 'react-native';
import { sin } from 'react-native-reanimated';

const CommonStyles = StyleSheet.create({
  appRedColor: {
    color: '#FF0000',
  },
  container: {
    flex: 1,
  },
  bgColor: {
    backgroundColor: '#fff',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarHeight: {
    // height: 60,
  },
  linearGradientBottomToTop: {
    position: 'absolute',
    top: '31.25%',
    width: '100%',
    bottom: 0,
    left: 0,
    flex: 1,
    opacity: 0.7,
  },
  fitToParent: {
    height: '100%',
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column-reverse',
    flex: 1,
  },
  fitToDevice: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fitToBottom: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  crossIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    opacity: 0.8,
  },
  leftCrossIcon: {
    height: 20,
    width: 20,
    opacity: 0.5,
    marginLeft: 3,
    marginRight: 3,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    top: '31.25%',
    width: '100%',
    bottom: 0,
    left: 0,
    flex: 1,
    opacity: 0.7,
  },
  centerText: {
    textAlign: 'center',
  },
  centerElement: {
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonCenterText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  margin: {
    margin: 10,
  },
  padding: {
    padding: 10,
  },
  buttonStyle: {
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
    borderRadius: 25,
  },
  textColorWhite: {
    color: 'white',
  },
  pb10: {
    paddingBottom: 10,
  },
  padding: {
    padding: 10,
  },
  stretch: {
    resizeMode: 'stretch',
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  ml10: {
    marginLeft: 20,
  },
  mll10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 20,
  },
  mt10: {
    marginTop: 20,
  },

  mt30: {
    marginTop: 30,
  },
  m10: {
    marginTop: 20,
  },
  mtt10: {
    marginTop: 10,
  },
  textSizeLarge: {
    fontSize: 22,
  },
  textSizeIcon: {
    fontSize: 26,
  },
  textSizeNormal: {
    fontSize: 16,
  },
  textSizeAverage: {
    fontSize: 14,
  },
  loginItemStyle: {
    borderColor: '#C5D4E8',
    alignSelf: 'center',
    borderRadius: 6,
    borderWidth: 1,
    shadowColor: '#8BB3E9',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  loginItemStyle23: {
    borderColor: '#C5D4E8',
    borderRadius: 6,
    borderWidth: 1,
    shadowColor: '#8BB3E9',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  itemStyle: {
    marginTop: 10,
    alignSelf: 'center',
    width: '88%',
    borderColor: '#707070',
  },
  textSizeMedium: {
    fontSize: 18,
  },
  textSizeSmall: {
    fontSize: 12,
  },
  fontMedium: {
    fontFamily: 'DINPro-Medium',
  },
  fontRegular: {
    fontFamily: 'DINPro-Regular',
  },
  fontBold: {
    fontFamily: 'DINPro-Bold',
  },
  br5: {
    borderRadius: 5
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    opacity: 0.5,
  },
  loaderIndicatorStyle: {
    color: '#297dec',

  },
  backButtonStyle: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  headingTextStyle: {
    paddingLeft: 15, 
    marginTop: 65
  },
  itemStyle: {
    justifyContent: 'space-between',
    width: '88%',
    alignSelf: 'center',
    marginTop: 10,
  },
  imageStyle:{
    width:30,
    height:20,
  }
})

export default CommonStyles;
