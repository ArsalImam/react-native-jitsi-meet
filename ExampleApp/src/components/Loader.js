import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    StatusBar
} from 'react-native';

const Loader = props => {
    const {
        loading,
        ...attributes
    } = props;

    return (

      
            
        <Modal

            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => { console.log('close modal') }}>
         
            <View style={styles.modalBackground}>
          
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading} color='#297dec' size='large'/>
                       
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#eeeeee',
        //height: 100,
        //width: 100,
        padding: 25,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default Loader;