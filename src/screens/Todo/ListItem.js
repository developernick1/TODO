import React, { useState } from 'react'
import { Platform, StyleSheet, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import fonts from '../../assets/fonts'
import { height, width } from '../../assets/string'
import { colors } from '../../assets/color'

function ListItem(props) {
    const [show, setshow] = useState(false)
    return (
        <View style={styles?.ListItemrapper}  >
            <Text style={styles?.TextList} >{props?.data?.tittle}</Text>
            <View style={styles?.TotalCheck} >
                <Pressable style={styles?.UpperCircle} onPress={() => { setshow(!show) }} >
                </Pressable>
                {show ?
                    <View style={styles?.Circle}>
                        <Text style={styles?.TickText} >✓</Text>
                    </View>
                    : null
                }
            </View>
            <View style={styles?.TotalCheck} >
                <Pressable style={styles?.UpperCircle} onPress={() => { props?.newData?.RemoveTask(props?.data?.id) }} >
                </Pressable>
               
                    <View style={styles?.Circle}>
                        <Text style={styles?.TickText} >X</Text>
                    </View>
                
            </View>
            <View style={styles?.TotalCheck} >
                <Pressable style={styles?.UpperCircle} onPress={() => { props?.newData?.updateTask(props?.data?.id) }} >
                </Pressable>
               
                    <View style={styles?.Circle}>
                        <Text style={styles?.TickText} >E</Text>
                    </View>
                
            </View>

        </View>
    )
}

export default ListItem


const styles = StyleSheet?.create({
    ListItemrapper: {
        backgroundColor: colors?.whiteColor,
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
        fontFamily: fonts.PoppinsLight,
        // textDecorationLine:'line-through',
        color: colors?.greyText,
    },
    TotalCheck: {
        width: height / 45,
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
    Circle: {
        backgroundColor: colors?.primaryColor,
        width: height / 60,
        height: height / 60,
        borderRadius: 500,
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'center',
        alignItems:'center',
        
    },
    TickText:{
        color:colors?.whiteColor
    }
})