import * as React from 'react';
import {WebView as Web} from 'react-native-webview';

export default class WebView extends React.Component {
  constructor (props) {
    super (props);
  }
  componentDidMount () {}
  render () {
    const {prescribtionUrl} = this.props.route.params;
    console.log(`prescribtionUrl ==========> ${prescribtionUrl}`);
    return <Web source={{uri: prescribtionUrl}} />;
  }
}