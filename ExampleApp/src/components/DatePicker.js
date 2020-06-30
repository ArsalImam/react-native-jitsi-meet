import React, { Component } from 'react';
import {Container, Header, Content, DatePicker, Text, Item, Input, Icon} from 'native-base';
import {ScrollView, StyleSheet} from "react-native";

export default class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        return (
            <Container>

                <Content>
                    <Item style={[styles.itemStyle, {alignSelf: 'center', width: '88%'}]} >

                         <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Select date"
                            textStyle={{ color: "green" }}
                            placeHolderTextStyle={{ color: "#1a73e8" }}
                            onDateChange={this.setDate}
                            disabled={false}
                        />
                        <Icon active name='calendar' />

                    </Item>


                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({

    itemStyle: {
        marginTop: 12,
        height: 50,
        borderColor: '#707070',
        //   marginTop: 10,
    },
})
