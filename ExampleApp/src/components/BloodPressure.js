import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import { Button } from 'native-base';
import CommonStyles from '../CommonStyles';


class BloodPressure extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            systolic: '',
            diSystolic: '',
            pulse: '',

        };
    }

    _onSave() {
        return this.state;
    }

    render() {
        return (
            <View style={[CommonStyles.container]}>
                <View style={[CommonStyles.container]}>


                    <Item floatingLabel
                        style={[CommonStyles.container, CommonStyles.itemStyle]
                        }>
                        <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                        {
                            marginLeft: 7
                        }
                        ]}>Systolic (mm/Hg)*
                            </Label>
                        <Input
                            value={this.state.systolic}
                            onChangeText={val => this.setState({ systolic: val })}
                            keyboardType='number-pad'
                            style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                            {
                                marginLeft: 5
                            }
                            ]} />
                    </Item>


                    <Item floatingLabel
                        value={this.state.diSystolic}
                        onChangeText={val => this.setState({ diSystolic: val })}
                        style={[CommonStyles.container, CommonStyles.itemStyle]}>
                        <Label
                            style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                            {
                                marginLeft: 7
                            }]}>Diastolic (mm/Hg)*
                        </Label>
                        <Input
                            value={this.state.pulse}
                            onChangeText={val => this.setState({ pulse: val })}
                            keyboardType='number-pad'
                            style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                            {
                                marginLeft: 5
                            }]} />
                    </Item>


                    <Item floatingLabel
                        style={[CommonStyles.container, CommonStyles.itemStyle]}>
                        <Label
                            style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                            {
                                marginLeft: 7
                            }]}>Pulse (Beats/Min)*
                        </Label>
                        <Input
                            keyboardType='number-pad'
                            style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium,
                            {
                                marginLeft: 5
                            }]}
                        />
                    </Item>

                </View>

            </View>
        );
    }
}

export default BloodPressure;