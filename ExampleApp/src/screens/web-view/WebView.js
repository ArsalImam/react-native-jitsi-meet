import * as React from 'react';
import {WebView as Web} from 'react-native-webview';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import CommonStyles from '../../CommonStyles';
import {Icon} from 'native-base';
export default class WebView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const {prescribtionUrl} = this.props.route.params;
    console.log(`prescribtionUrl ==========> ${prescribtionUrl}`);
    console.warn(`prescribtionUrl ==========> ${prescribtionUrl}`);
    return (
      <View style={[CommonStyles.container]}>
        
        <Web style={{flex:1,marginTop:50}} source={{uri: prescribtionUrl}} />
        <View style={[CommonStyles.container,CommonStyles.backButtonStyle]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon
              name="arrow-back"
              type="MaterialIcons"
              style={{color: '#000000'}}
            />
         
          </TouchableOpacity>
        </View>
        

        
      </View>
    );
  }
}
