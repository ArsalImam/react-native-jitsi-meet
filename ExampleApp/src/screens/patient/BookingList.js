import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { CommonStyles } from '../../CommonStyles';
import { Configs } from '../../Configs';

export default class BookingList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            checked: true
        };
    }
    //   componentDidMount() {
    //  //   fetch(`${Configs.baseUrl}Appointments`)
    //     fetch('https://reactnative.dev/movies.json')
    //       .then((response) => response.json())
    //       .then((json) => {
    //   //      this.setState({ data: json});
    //         this.setState({ data: json.movies});
    //       })
    //       .catch((error) => console.error(error))
    //       .finally(() => {
    //         this.setState({ isLoading: false });
    //       });
    //   }

    async componentDidMount() {
        try {
            let response = await fetch(
                'https://reactnative.dev/movies.json'
            );
            let json = await response.json();
            this.setState({ data: json.movies, isLoading: false });

        } catch (error) {
            console.error(error);
        }
    }



    render() {


        const { data, isLoading } = this.state;

        // const main = [
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },
        //     { name: 'SHAZ QURESHI', code: '#9ed75f', date: 'May 15, 2020', time: '06:00 pm to 08:00', route: '' },

        // ];

        return (
            <View style={CommonStyles.container}>

                <ImageBackground style={CommonStyles.backgroundImage} source={require('../../assets/drawable-xhdpi/bwback.png')}>
                    <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />

                    <View style={styles.View3}>

                        <Text numberOfLines={3} style={{ color: '#fff', marginHorizontal: '7%', marginBottom: 15, }}>
                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge, { lineHeight: 28 }]} >{`Bookings\n`}</Text>
                            <Text style={[CommonStyles.SFProLight, CommonStyles.textSizeSmall, { lineHeight: 16 }]}>It is a list of your all booking patients </Text>
                        </Text>
                    </View>

                    <View style={styles.View2}>
                        {isLoading ? <View style={{ flex: 1, padding: 20 }}>
                            <ActivityIndicator size="large" color="#297dec" />
                        </View> : (
                                <FlatGrid
                                    itemDimension={320}
                                    items={data}
                                    keyExtractor={({ id }, index) => id}
                                    spacing={12}
                                    renderItem={({ item }) => (

                                        <View style={{ height: 105, justifyContent: 'center', alignItems: "center" }}>
                                            <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={require('../../assets/drawable-xhdpi/Fill-1.png')}>

                                                <View style={[styles.itemContainer, { flexDirection: 'row' }]}>

                                                    <View style={[styles.view1, { paddingLeft: 16, }]}>
                                                        <Text>
                                                            <Text style={[CommonStyles.DINProLight, CommonStyles.textSizeSmall, { color: '#333333', lineHeight: 16 }]}>{`Patient Name\n`}</Text>
                                                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeAverage, { color: '#333333', lineHeight: 20 }]}>{item.title}</Text>
                                                        </Text>

                                                        <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                            <Text style={[CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>{`Time: `}</Text>
                                                            <Text style={CommonStyles.DINAltBold}>{item.releaseYear}</Text>
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
                                                                <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeAverage, { color: '#333333' }]}>{item.releaseYear}</Text>
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    )}
                                />
                            )}

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
        marginTop: '6%',
        flex: 8,
        alignSelf: 'center',
        width: '94%'
    },
    view1: {
        height: '100%',
        width: '50%',
        justifyContent: 'space-evenly',
    },
});