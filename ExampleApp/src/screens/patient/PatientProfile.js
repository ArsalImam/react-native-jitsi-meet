import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import CommonStyles from '../../CommonStyles';

export default class PatientProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            checked: true,
        };
    }

    render() {
        const main = [
            { name: 'MBBS', code: 'Cardio Specialist', fromYears: '2002 - 2008', Uni: 'UNIVERSITY OF LONDON', route: '' },
            { name: 'MBBS', code: 'Cardio Specialist', fromYears: '2002 - 2008', Uni: 'UNIVERSITY OF LONDON', route: '' },
            { name: 'MBBS', code: 'Cardio Specialist', fromYears: '2002 - 2008', Uni: 'UNIVERSITY OF LONDON', route: '' },
            { name: 'MBBS', code: 'Cardio Specialist', fromYears: '2002 - 2008', Uni: 'UNIVERSITY OF LONDON', route: '' },
            { name: 'MBBS', code: 'Cardio Specialist', fromYears: '2002 - 2008', Uni: 'UNIVERSITY OF LONDON', route: '' },
            { name: 'MBBS', code: 'Cardio Specialist', fromYears: '2002 - 2008', Uni: 'UNIVERSITY OF LONDON', route: '' },
            { name: 'MBBS', code: 'Cardio Specialist', fromYears: '2002 - 2008', Uni: 'UNIVERSITY OF LONDON', route: '' },

        ];
        return (

            <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/drawable-xhdpi/drback1.png')}>
                    <View style={styles.MyView}></View>
                    <View style={styles.MyView1}>
                        <View style={[{ flexDirection: 'row', alignContent: 'flex-start', height: 105 }]}>
                            <View style={[{ backgroundColor: '#7DEE00', borderBottomLeftRadius: 5, borderTopLeftRadius: 5, width: 105 }]}>
                                <Image style={{ height: '97%', width: '100%', resizeMode: 'cover', }} source={require('../../assets/drawable-xxxhdpi/Mask.png')}>
                                </Image>
                            </View>
                            <View style={[CommonStyles.container, { justifyContent: 'flex-end', marginLeft: 10, marginBottom: -7 }]}>
                                <Text>
                                    <Text style={[CommonStyles.fontRegular, { color: '#7DEE00' }]}>Online{`\n`}</Text>
                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage, CommonStyles.textColorWhite]}>Islamabad, Pakistan{`\n`}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={[CommonStyles.container, {justifyContent: 'space-evenly'}]}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textColorWhite]} >
                                <Text style={[{ fontSize: 32 }]}>Dr. Iqbal Memon{`\n`}</Text>
                                <Text style={[{ fontSize: 20 }]}>FCPS, FCPS{`\n`}</Text>
                            </Text>
                            
                            <Text style={[CommonStyles.textColorWhite, CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Please enter your details to get the information about your health and your doctorrightawy !!!</Text>
                            <Text style={[CommonStyles.textColorWhite, CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Call:    0331-0000000</Text>
                            <Text style={[CommonStyles.textColorWhite, CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Age:    70 Years</Text>
                        </View>
                    </View>

                    <View style={styles.MyView2}>

                        <FlatGrid
                            itemDimension={140}
                            items={main}
                            style={styles.gridView}
                            //staticDimension={300}
                            //fixed
                            // spacing={10}
                            renderItem={({ item, index }) => (

                                <View style={styles.itemContainer}>
                                    <Text>
                                        <Text style={[CommonStyles.DINProMedium, { fontSize: 20, lineHeight: 27 }]}>{item.name}{`\n`}</Text>
                                        <Text style={[CommonStyles.DINProMedium, { fontSize: 14, color: '#999999', lineHeight: 19 }]}>{item.code}{`\n`}</Text>
                                    </Text>
                                    <Text style={[CommonStyles.DINProMedium, { fontSize: 14, color: '#999999', lineHeight: 22 }]}>
                                        <Text >{item.fromYears}{`\n`}</Text>
                                        <Text >{item.Uni}</Text>
                                    </Text>

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
        //   backgroundColor: "#c0d4e2",
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,

    },
    gridView: {
        flex: 1,
    },
    boxContainer: {
        height: 150,
        //    borderRadius: 7,
    },
    itemContainer: {
        flex: 1,
        height: 146,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },
    MyView: {
        flex: .85,
    },

    MyView1: {
        flex: 4.1,
        paddingHorizontal: 15
    },
    MyView2: {
        //   marginTop: '6%',
        flex: 3.8,
        //  borderWidth: 2,
        //marginTop: 30,
        alignSelf: 'center',
        width: '91%',
        //       backgroundColor: 'rgba(52, 52, 52, 0.9)',
        //   borderRadius: 7,
    },
    view1: {
        //    backgroundColor: 'red',
        height: '100%',
        width: '50%',
        justifyContent: 'space-evenly',
        //  borderRadius: 7,
        paddingHorizontal: 15
    },
    itemName: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: 'red',
    },

    buttonStyle: {
        right: 0,
        left: 0,
        top: 0,
        width: '100%',
        height: 55,
        marginTop: -27.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        borderRadius: 5,
        marginVertical: 15,

    },
});