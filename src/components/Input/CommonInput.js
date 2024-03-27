import { View, Text, StyleSheet, TextInput, Platform, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EYE_Icon, Mail_Icon } from '../../assets/icons'
import { height, width } from '../../assets/string'
import { colors } from '../../assets/color'
import fonts from '../../assets/fonts'

const CommonInput = ({ data }) => {
    const [showText, setshowText] = useState(true);

    
  useEffect(() => {
    setshowText(data?.type == 'password' ? true : false)
  }, [])


    return (
        <Pressable style={styles?.InputWrapper} onPress={() => data?.InputPress ? data?.InputPress() : {}} >
            {data.IconOne && <data.IconOne height={30} width={'15%'} />}
            <Text>{data?.ExtraVal}</Text>
            <TextInput
                secureTextEntry={showText}
                style={styles.input}
                onChangeText={data?.onChangeNumber}
                // value={number}}
                editable={!data?.inputDisable}
                placeholder={data?.PlaceHolderTittle}
                keyboardType="email-address"
            />
            {data?.type == 'password' ?
            <Pressable style={{height: 25, width: '15%'}}  onPress={() => { setshowText(!showText)  }} >
                <data.IconTwo height={'100%'} width={'100%'} />
            </Pressable>
                : null
            }
        </Pressable>
    )
}

export default CommonInput


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
        // shadowOpacity: 0.53,
        shadowOpacity: Platform?.OS === 'android' ? 0.53 : 0.2,
        shadowRadius: 13.97,
        elevation: 21,
    },
    input: {
        width: '70%',
        fontSize: 12,
        fontFamily: fonts?.PoppinsRegular,
        color: colors?.greyText,

    }
})