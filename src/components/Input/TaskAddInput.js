import { View, Text, StyleSheet, TextInput, Platform, Pressable } from 'react-native'
import React from 'react'
import { EYE_Icon, Mail_Icon } from '../../assets/icons'
import { height, width } from '../../assets/string'
import { colors } from '../../assets/color'
import fonts from '../../assets/fonts'

const TaskAddInput = ({ data }) => {
    return (
        <View style={styles?.InputWrapper} onPress={() => data?.InputPress ? data?.InputPress() : {}} >
            {data.IconOne && <data.IconOne height={30} width={'15%'} />}
            {/* <Text>{data?.ExtraVal}</Text> */}
            <TextInput
                secureTextEntry={false}
                style={styles.input}
                // onChangeText={onChangeNumber}
                // value={number}
                editable={!data?.inputDisable}
                placeholder={data?.PlaceHolderTittle}
                keyboardType="email-address"
            />
            <Pressable style={styles?.IconTwoStyle}  >
                <data.IconTwo height={'70%'} width={'70%'} />
            </Pressable>
        </View>
    )
}

export default TaskAddInput


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
    },
    IconTwoStyle: {
    //    backgroundColor:'red',
       justifyContent:'center',
       alignItems:'center',
       width: '15%',
       height: '75%',
    },
})