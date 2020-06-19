import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown-v2';

const BloodGlucose = () => {

    let data = [{
        value: 'Pre Breakfast',
    }, {
        value: 'Post Breakfast',
    }, {
        value: 'Pre Lunch',
    }, {
        value: 'Post Lunch',
    }, {
        value: 'Post Dinner',
    }, {
        value: 'Bed Time',
    }, {
        value: 'After Snakes',
    },];

    let data1 = [{
        value: 'Pre Medicine',
    }, {
        value: 'Post Medicine',
    }]
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.vitalStyle}>
                    <Item  inlineLabel underline={true} style={styles.itemStyle}>
                        <Label>   Blood Glucose (mg/dl)*</Label>
                        <Input keyboardType='number-pad' />
                    </Item>
                    <Dropdown style={styles.itemStyle}
                        label='Select Meal'
                        data={data}
                    />

                    <Dropdown style={styles.itemStyle}
                        label='Select Vital Type'
                        data={data1}
                    />

                    <Item inlineLabel underline= {true} style={styles.itemStyle}>
                        <Label >   Notes*</Label>
                        <Input multiline />
                    </Item>

                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.textStyle}>Submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c0d4e2',
    },
    itemStyle: {
        width: '99.4%', 
        height: 60, 
        borderColor: 'grey', 
        marginTop: 10,
        backgroundColor: '#fff'
        
    },
    vitalStyle: {
        backgroundColor: 'white',
        margin: 20,
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
        marginTop: 50,
        alignSelf: 'center',
        width: '80%',
        height: 45,
        backgroundColor: '#3976bb',
        borderRadius: 7,
        marginBottom: 50
    }
})

export default BloodGlucose;