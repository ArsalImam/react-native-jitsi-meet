import {StyleSheet} from 'react-native';

export const CommonStyles = StyleSheet.create({
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
    flex: 1,
  },
  linearGradientBottomToTop: {
    position: 'absolute',
    top: '31.25%',
    width: '100%',
    bottom: 0,
    left: 0,
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
    height: '100%',
    width: '100%',
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
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  buttonCenterText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  margin: {
    margin: 10,
  },
  buttonStyle: {
    shadowOffset: {height: 0, width: 0},
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
  mr10: {
    marginRight: 20,
  },
  mt10: {
    marginTop: 20,
  },
  mtt10: {
    marginTop: 10,
  },
  textSizeLarge: {
    fontSize: 21,
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
  textSizeMedium: {
    fontSize: 18,
  },
  textSizeSmall: {
    fontSize: 12,
  },
  backImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  DINProLight: {
    fontFamily: 'DINPro-Light'
  },
  DINProBold: {
    fontFamily: 'DINPro-Bold'
  },
  DINProRegular: {
    fontFamily: 'DINPro-Regular'
  },
  DINProMedium: {
    fontFamily: 'DINPro-Medium'
  },
  DINAltBold: {
    fontFamily: 'DINPro-Regular',
    fontWeight: 'normal'
    
  },
  SFProLight: {
    fontFamily: 'SFProText-Light'
  },
  SFProSemiBold: {
    fontFamily: 'SFProText-Bold'
  },
  SFProBold: {
    fontFamily: 'SFProText-Semibold'
  },

  


});
export default CommonStyles;
