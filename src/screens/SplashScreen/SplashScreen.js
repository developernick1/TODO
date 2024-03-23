import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../assets/color';
import { Logo_Icon, Waves_Icon } from '../../assets/icons';
import { height, width } from '../../assets/string';
import fonts from '../../assets/fonts';

const SplashScreen = () => {
    return (
        <View style={styles?.splashWrapper} >
            <View style={styles?.centerView} >
                <Logo_Icon height={height / 5} width={width / 1.2} />
                <Text style={styles?.mainHeading} >Drop's Water Tracker</Text>
                <Text style={styles?.subHeading} >Stay hydrated and track your daily water intake</Text>
            </View>
            <View style={styles?.downIcon} >
                <Waves_Icon height={height / 5} width={width} />
            </View>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    splashWrapper: {
        backgroundColor: colors?.primaryColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    downIcon: {
        position: 'absolute',
        bottom: 0,
    },
    mainHeading: {
        fontFamily: fonts?.PoppinsBold,
        fontSize: 24,
        color: colors?.whiteColor,
        textAlign: 'center',
        marginTop: 5,
        textShadowRadius: 15,
        textShadowColor: colors?.shadowColor,
        textShadowOffset: {
            width: 0,
            height: 2,
        },
    },
    subHeading: {
        fontFamily: fonts?.PoppinsRegular,
        fontSize: 14,
        color: colors?.whiteColor,
        width: width / 1.8,
        textAlign: 'center',

    },
})