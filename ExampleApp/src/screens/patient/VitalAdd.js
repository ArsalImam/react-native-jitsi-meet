import React, { Component } from "react";
import { Button, Container, Header, Content, Icon, Picker, Form, View } from "native-base";
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import BloodGlucose from '../../components/BloodGlucose';
import BloodPressure from '../../components/BloodPressure';
import BloodOxygen from '../../components/BloodOxygen';

export default class VitalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  _onSave = (data) => {

  }
  
  clickme = (params) => {
    switch (params) {
      case 'key0':
        return <BloodGlucose />;
        break
      case 'key1':
        return <BloodPressure onSave={this._onSave} />;
        break
      case 'key2':
        return <BloodOxygen />;
        break
      default:
        return <View />;
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: '92%', alignSelf: 'center', marginTop: 30}}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Select Vital Type" value="" />
              <Picker.Item label="Blood Glucose" value="key0" />
              <Picker.Item label="Blood Pressure" value="key1" />
              <Picker.Item label="Blood Oxygen" value="key2" />
            </Picker>
          </Form>
          {this.clickme(this.state.selected)}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0d4e2',
  },
  textStyle: {
    fontSize: 22,
    color: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 12
  },
  buttonStyle: {
    width: '80%',
    height: 60,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  }
})