import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown-v2';
import CommonStyles from '../CommonStyles';

class BloodGlucose extends React.Component {

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
    render() {
        return (
            <SafeAreaView style={[CommonStyles.container]}>

                <View style={[CommonStyles.container,]}>
                    <Item floatingLabel
                     style={[CommonStyles.container, CommonStyles.itemStyle]}>
                        <Label>Blood Glucose (mg/dl)*</Label>
                        <Input keyboardType='number-pad' />
                    </Item>

                    <Item
                        picker
                        style={[
                            CommonStyles.container,
                            CommonStyles.itemStyle,
                            { marginVertical: 10, paddingTop: 10 },
                        ]}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Choose Frequency"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}>
                            <Picker.Item
                                color="gray"
                                selected={false}
                                label="Select Meal"
                                value=""
                            />
                            <Picker.Item label="Pre Breakfast" value="key0" />
                            <Picker.Item label="Post Breakfast" value="key1" />
                            <Picker.Item label="Pre Lunch" value="key2" />
                            <Picker.Item label="Post Lunch" value="key3" />
                            <Picker.Item label="Bed Time" value="key4" />
                            <Picker.Item label="After Snakes" value="key5" />
    
                        </Picker>
                    </Item>

                    <Item
                        picker
                        style={[
                            CommonStyles.container,
                            CommonStyles.itemStyle,
                            { marginVertical: 10, paddingTop: 10 },
                        ]}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            placeholder="Choose Frequency"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}>
                            <Picker.Item
                                color="gray"
                                selected={false}
                                label="Select Vital Type"
                                value=""
                            />
                            <Picker.Item label="Pre Medicine" value="key0" />
                            <Picker.Item label="Post Medicine" value="key1" />

                        </Picker>
                    </Item>

                </View>
            </SafeAreaView>
        );
    }
}

export default BloodGlucose;