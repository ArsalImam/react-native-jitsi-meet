import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import { Button } from 'native-base';
import CommonStyles from '../CommonStyles';

const BloodPressure = (props) => {
//this._onSave({});
    return (
        <View style={[CommonStyles.container]}>
            <View style={[CommonStyles.container]}>
                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
                    <Label >Systolic (mm/Hg)*</Label>
                    <Input keyboardType='number-pad' />
                </Item>

                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
                    <Label >Diastolic (mm/Hg)*</Label>
                    <Input keyboardType='number-pad' />
                </Item>

                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
                    <Label >Pulse (Beats/Min)*</Label>
                    <Input keyboardType='number-pad' />
                </Item>

            </View>

        </View>
    );
}

export default BloodPressure;