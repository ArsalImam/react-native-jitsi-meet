import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import { Configs } from '../../Configs';

export default class CompleteBookings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            checked: true
        };
    }
    render() {

        const main = [
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
            { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },

        ];

        return (
            <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>

                    <View style={styles.View3}>

                        <Text numberOfLines={3} style={{ color: '#fff', marginHorizontal: 15, marginBottom: 15, }}>
                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge, { lineHeight: 28 }]} >{`Completed\n`}</Text>
                            <Text style={[CommonStyles.SFProLight, CommonStyles.textSizeSmall, { lineHeight: 16 }]}>It is a list of your all booking patients </Text>
                        </Text>
                    </View>

                    <View style={styles.View2}>
                        <FlatGrid
                            itemDimension={320}
                            items={main}
                            renderItem={({ item }) => (

                                <View style={{ height: 105, justifyContent: 'center', alignItems: "center" }}>
                                    <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/Fill-1.png')}>

                                        <View style={[styles.itemContainer, { flexDirection: 'row' }]}>

                                            <View style={[styles.view1, { paddingLeft: 16, }]}>
                                                <Text>
                                                    <Text style={[CommonStyles.DINProLight, CommonStyles.textSizeSmall, { color: '#333333', lineHeight: 16 }]}>{`Patient Name\n`}</Text>
                                                    <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeAverage, { color: '#333333', lineHeight: 20 }]}>{item.name}</Text>
                                                </Text>

                                                <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                    <Text style={[CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>{`Time: `}</Text>
                                                    <Text style={CommonStyles.DINAltBold}>{item.time}</Text>
                                                </Text>
                                            </View>
                                            <View style={[styles.view1, { paddingRight: 16 }]}>
                                                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 10 }}>
                                                    <CheckBox
                                                        containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0.0)', borderColor: 'rgba(52, 52, 52, 0.0)', marginRight: -12 }}
                                                        textStyle={{ fontSize: 12, fontWeight: '600', color: '#497C12' }}
                                                        iconRight
                                                        iconType='material'
                                                        checkedIcon='check-box'
                                                        uncheckedIcon='add'
                                                        checkedColor='#9CD85B'
                                                        uncheckedColor='#9CD85B'
                                                        title='Accepted'
                                                        checked={this.state.checked}
                                                    />
                                                    <Text style={{ marginBottom: 6 }}>
                                                        <Text style={[CommonStyles.textSizeSmall, CommonStyles.DINProLight, { color: '#333333' }]}>{`Date: `}</Text>
                                                        <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeAverage, { color: '#333333' }]}>{item.date}</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            )}
                        />

                    </View>

                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridView: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        height: 101,
    },
    View3: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    View2: {
        marginTop: 10,
        flex: 8,
       marginHorizontal: 8
    },
    view1: {
        height: '100%',
        width: '50%',
        justifyContent: 'space-evenly',
    },
});