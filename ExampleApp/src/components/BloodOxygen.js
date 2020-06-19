import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import { Button } from 'native-base';

const BloodOxygen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.vitalStyle}>
                <Item floatingLabel style={styles.itemStyle}>
                    <Label > Blood Oxygen(%)*</Label>
                    <Input keyboardType='number-pad' />

                </Item>

                <Item floatingLabel style={styles.itemStyle}>
                    <Label > Notes*</Label>
                    <Input multiline />
                </Item>

                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c0d4e2',
    },
    itemStyle: {
        width: '99%', 
        height: 60, 
        borderColor: 'black', 
        marginTop: 10,
        backgroundColor: '#fff'
    },
    vitalStyle: {
        backgroundColor: 'white',
        margin: 20,
        marginVertical: 40,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    textStyle: {
        fontSize: 22,
        color: '#fff',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 8
    },
    buttonStyle: {
        marginVertical: 50,
        alignSelf: 'center',
        width: '80%',
        height: 45,
        backgroundColor: '#3976bb',
        borderRadius: 7,
    }
})

export default BloodOxygen;