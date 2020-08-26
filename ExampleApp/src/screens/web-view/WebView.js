import * as React from 'react';
import {WebView as Web} from 'react-native-webview';
import {View, Text, ImageBackground} from 'react-native';
import CommonStyles from '../../CommonStyles';
export default class WebView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const {prescribtionUrl} = this.props.route.params;
    console.log(`prescribtionUrl ==========> ${prescribtionUrl}`);
    console.warn(`prescribtionUrl ==========> ${prescribtionUrl}`);
  return <Web source={{uri: prescribtionUrl}} />
    
    
    
    
  }
}
