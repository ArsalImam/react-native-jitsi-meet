import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { CommonStyles } from '../../CommonStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class DrProfile extends Component {

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

            <View style={CommonStyles.container}>

                <ImageBackground style={CommonStyles.backgroundImage} source={require('../../assets/drawable-xhdpi/drback1.png')}>
                    <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
                    <View style={styles.MyView}></View>
                    <View style={styles.MyView1}>
                        <View style={{ height: 111, width: '100%', flexDirection: 'row', alignItems: 'flex-end', alignContent: 'flex-end'}}>
                            <View style={{ height: 111, width: 105, backgroundColor: '#7DEE00', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                                <Image style={{ width: '100%', height: 105, resizeMode: 'cover' }} source={require('../../assets/drawable-xxxhdpi/Mask.png')}>
                                </Image>
                            </View>
                            <Text style={{alignSelf: 'flex-end', justifyContent: 'flex-end', marginLeft: 15, marginBottom: -10}}>
                                <Text style={[CommonStyles.DINProRegular, { fontSize: 14, color: '#7DEE00', lineHeight:19, }]}>Online{`\n`}</Text>
                                <Text style={[CommonStyles.DINProRegular, { fontSize: 14, color: '#fff', lineHeight: 19}]}>Islamabad, Pakistan{`\n`}</Text>
                            </Text>

                        </View>
                        <Text >
                            <Text style={[CommonStyles.DINAltBold, { fontSize: 32, lineHeight: 43, color: '#fff' }]}>Dr. Iqbal Memon{`\n`}</Text>
                            <Text style={[CommonStyles.DINProRegular, { fontSize: 20, color: '#fff', lineHeight: 27 }]}>FCPS, FCPS{`\n`}</Text>
                        </Text>


                        <Text style={[CommonStyles.SFProLight, { fontSize: 14, lineHeight: 19, color: '#fff' }]}>Please enter your details to get the information about your health and your doctorrightawy !!!</Text>
                        <Text style={[CommonStyles.DINProRegular, { fontSize: 16, lineHeight: 21, color: '#fff' }]}>Call:    0331-0000000</Text>
                        <Text style={[CommonStyles.DINProRegular, { fontSize: 16, lineHeight: 21, color: '#fff', paddingBottom: 40 }]}>Age:    70 Years</Text>
                    </View>

                    <View style={styles.MyView2}>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={[CommonStyles.DINProMedium, { color: '#FFF', fontSize: 15 }]}>ONLINE CONSULTAION</Text>
                        </TouchableOpacity>
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
        //    borderWidth: 5,
        alignSelf: 'center',
        width: '91%',
        justifyContent: 'space-between',


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