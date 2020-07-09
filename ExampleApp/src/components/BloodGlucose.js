import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown-v2';
import CommonStyles from '../CommonStyles';

class BloodGlucose extends React.Component {


    constructor(props) {
        super(props);
        //this._onSave = this._onSave.bind(this),
        this.state = {
            value: '',
            selectedMeal: '',
            selectedMedicine: '',
        };
    }

    _onSave() {
        return this.state;
    }



    render() {
        return (

            <View style={[CommonStyles.container,]}>

                <Item floatingLabel
                    style={[CommonStyles.container, CommonStyles.itemStyle]}>
                    <Label
                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                        {
                            marginLeft: 7
                        }
                        ]}
                    >Blood Glucose (mg/dl)*
                            </Label>
                    <Input
                        value={this.state.value}
                        onChangeText={txt => this.setState({ value: txt })}
                        keyboardType='number-pad'
                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                        {
                            marginLeft: 4
                        }
                        ]}
                    />
                </Item>


                <Item
                    picker
                    style={[
                        CommonStyles.container,
                        CommonStyles.itemStyle,

                    ]}>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        textStyle={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]}
                        placeholder="Select Meal"
                        placeholderStyle={{ color: '#bfc6ea' }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selectedMeal}
                        onValueChange={txt => this.setState({ selectedMeal: txt })}>
                        <Picker.Item
                            color="gray"
                            selected={false}
                            label="Select Meal"
                            value=""
                        />
                        <Picker.Item label="Pre Breakfast" value="Pre Breakfast" />
                        <Picker.Item label="Post Breakfast" value="Post Breakfast" />
                        <Picker.Item label="Pre Lunch" value="Pre Lunch" />
                        <Picker.Item label="Post Lunch" value="Post Lunch" />
                        <Picker.Item label="Bed Time" value="Bed Time" />
                        <Picker.Item label="After Snakes" value="After Snakes" />

                    </Picker>
                </Item>

                <Item
                    picker
                    style={[
                        CommonStyles.container,
                        CommonStyles.itemStyle,

                    ]}>
                    <Picker
                        mode="dropdown"
                        textStyle={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Choose Frequency"
                        placeholderStyle={{ color: '#bfc6ea' }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.selectedMedicine}
                        onValueChange={txt => this.setState({ selectedMedicine: txt })}>
                        <Picker.Item
                            color="gray"
                            selected={false}
                            label="Select Medicine Type"
                            value=""
                        />
                        <Picker.Item label="Pre Medicine" value="Pre Medicine" />
                        <Picker.Item label="Post Medicine" value="Post Medicine" />

                    </Picker>
                </Item>

            </View>
        );
    }
}

export default BloodGlucose;