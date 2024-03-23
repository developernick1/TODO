import { View, Text, StyleSheet, TextInput, Platform, Pressable } from 'react-native'
import React from 'react'
import { EYE_Icon, Mail_Icon } from '../../assets/icons'
import { height, width } from '../../assets/string'
import { colors } from '../../assets/color'
import fonts from '../../assets/fonts'

const CountryCodeInput = ({ data }) => {
    return (
        <Pressable style={styles?.InputWrapper} onPress={() => data?.InputPress ? data?.InputPress() : {}} >
            {/* {data.IconOne && <data.IconOne height={30} width={'15%'} />} */}
            <View style={styles?.styleIcons} >
            {data?.FirstIconOrText === '' ? 
                <data.IconOne height={30} width={20} />
                :
                <Text>{data?.FirstIconOrText}</Text>
            }
                <Text>{data?.ExtraVal}</Text>
            </View>
            <TextInput
                secureTextEntry={false}
                style={styles.input}
                // onChangeText={onChangeNumber}
                // value={number}
                editable={!data?.inputDisable}
                placeholder={data?.PlaceHolderTittle}
                keyboardType="email-address"
            />
            {data?.type == 'password' ?

                <data.IconTwo height={25} width={'15%'} />
                : null
            }
        </Pressable>
    )
}

export default CountryCodeInput


const styles = StyleSheet.create({
    InputWrapper: {
        backgroundColor: colors?.InputBackground,
        width: '100%',
        height: height / 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 10,
        shadowColor: colors?.InputShadow,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: Platform?.OS === 'android' ? 0.53 : 0.2,
        shadowRadius: 13.97,
        elevation: 21,
    },
    styleIcons: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        width: width / 8,
    },
    input: {
        width: '70%',
        fontSize: 12,
        fontFamily: fonts?.PoppinsRegular,
        color: colors?.greyText,

    }
})