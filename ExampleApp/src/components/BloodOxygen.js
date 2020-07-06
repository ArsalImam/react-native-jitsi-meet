import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import { Button } from 'native-base';
import CommonStyles from '../CommonStyles';

class BloodOxygen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {

            value: '',

        };
    }

    _onSave() {
        return this.state;
    }
 
    render() {

        

        return (
            <View style={[CommonStyles.container]}>
                <Item floatingLabel
                    style={[CommonStyles.container, CommonStyles.itemStyle]}>
                    <Label
                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                        {
                            marginLeft: 7
                        }
                        ]}>Blood Oxygen(%)*
                    </Label>
                    <Input
                    value={this.state.value}
                    onChangeText={val => this.setState({ value: val})}
                        keyboardType='number-pad'
                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                        {
                            marginLeft: 5
                        }
                        ]}
                    />
                </Item>

            </View>
        );
    }
}

export default BloodOxygen;