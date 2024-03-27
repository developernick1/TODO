import React, { useState } from 'react'
import { Platform, StyleSheet, View, Pressable, Text, TextInput } from 'react-native'
import fonts from '../../assets/fonts'
import { height, width } from '../../assets/string'
import { colors } from '../../assets/color'
import { Delete_Icon, Edit_Icon, Lock_Icon, Plus_Icon, Tick_Icon } from '../../assets/icons'

function CompletedListItem(props) {
    const [show, setshow] = useState(false)
    const [value, setvalue] = useState('')
    const [edit, setedit] = useState(false)


    const MoveItem = () => {
        props?.newData?.moveCompItem(props?.data?.id)
        setshow(!show)
        console?.log(props?.data?.title?.length )
    }




    return (
        <View style={styles?.ListItemrapper}  >
            <TextInput
                style={styles?.TextList}
                onChangeText={(text) => setvalue(text)}
                editable={props?.newData?.editTask }
            // value={value}
            >
                <Text style={styles?.UnderLine} >{props?.data?.tittle?.length > 15 ? `${props?.data?.tittle.substring(0, 32)}...` : props?.data?.tittle}</Text>

            </TextInput>
    
                    <View style={styles?.TotalCheck} >
                        <Pressable style={styles?.UpperCircle} onPress={() => {MoveItem()  }} >
                        </Pressable>
                        {!show ?
                            <View style={styles?.Circle}>
                                <Text style={styles?.TickText} >✓</Text>
                            </View>
                            : null
                        }
                    </View>
        </View>
    )
}

export default CompletedListItem


const styles = StyleSheet?.create({
    ListItemrapper: {
        backgroundColor: colors?.greyCheck,
        // backgroundColor: 'yellow',
        borderRadius: width,
        paddingVertical: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: colors?.InputShadow,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: Platform?.OS === 'android' ? 0.53 : 0.1,
        shadowRadius: 13.97,
        elevation: 21,
    },
    TextList: {
        fontSize: 18,
        width: '80%',
        fontFamily: fonts.PoppinsBold,
        // textDecorationLine:'line-through',
        color: colors?.greyText,
    },
    UnderLine: {
        fontSize: 18,
        fontFamily: fonts.PoppinsRegular,
        // textDecorationLine:'line-through',
        color: colors?.greyText,
        textDecorationLine:'line-through'
    },
    TotalCheck: {
        width: '20%',
        height: height / 45,
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    UpperCircle: {
        width: height / 45,
        height: height / 45,
        borderRadius: 500,
        // backgroundColor: 'yellow',
        borderColor: colors?.greyCheck,
        borderWidth: 1.5,
        shadowColor: colors?.InputShadow,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: Platform?.OS === 'android' ? 0.53 : 1,
        shadowRadius: 13.97,
        elevation: 21,
        zIndex: 5,

    },
    UpperCircleForIcon: {
        width: height / 45,
        height: height / 45,
        // borderRadius: 500,
        // backgroundColor: 'yellow',
        // borderColor: colors?.greyCheck,
        // borderWidth: 1.5,
        shadowColor: colors?.InputShadow,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: Platform?.OS === 'android' ? 0.53 : 1,
        shadowRadius: 13.97,
        elevation: 21,
        zIndex: 5,

    },
    Circle: {
        backgroundColor: '#49c048',
        width: height / 60,
        height: height / 60,
        borderRadius: 500,
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    TickText: {
        color: colors?.whiteColor
    }
})