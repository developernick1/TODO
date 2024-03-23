import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { colors } from '../../assets/color'
import { height } from '../../assets/string'
import fonts from '../../assets/fonts'

const CommonButton = ({ data, }) => {
    return (
        <Pressable style={styles?.ButtonWrapper} onPress={() => { data?.onClick ? data?.onClick() : {} }} >
            <Text style={styles?.ButtonTittle}  >{data?.Tittle}</Text>
        </Pressable>
    )
}

export default CommonButton

const styles = StyleSheet.create({
    ButtonWrapper: {
        backgroundColor: colors?.primaryColor,
        width: '100%',
        height: height / 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: 10,
        shadowColor: colors?.buttonshadowColor,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        // shadowOpacity: 0.58,
        shadowOpacity: Platform?.OS === 'android' ? 0.58 : 0.3,
        shadowRadius: 16.00,
        elevation: 24,
    },
    ButtonTittle: {
        color: colors?.whiteColor,
        fontFamily: fonts?.PoppinsBold,
        fontSize: 14,
        textTransform: 'uppercase',
    },
})