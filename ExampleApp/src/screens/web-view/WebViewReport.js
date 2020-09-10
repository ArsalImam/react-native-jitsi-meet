import * as React from 'react';
import { WebView } from 'react-native-webview';
import CommonStyles from '../../CommonStyles';
export default class WebViewReport extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const {prescribtionUrl} = this.props.route.params;
    console.log(`prescribtionUrl ==========> ${prescribtionUrl}`);
    console.warn(`prescribtionUrl ==========> ${prescribtionUrl}`);
    return <WebView source={{uri: prescribtionUrl}} />;
  }
}
