/* eslint-disable prettier/prettier */

import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import fonts from '../assets/fonts';
import { useDispatch } from 'react-redux';
import { height, width } from '../assets/string';
import { colors } from '../assets/color';
import { Plus_Icon } from '../assets/icons';
// import { setLogOut } from '../screens/HRMS/redux/actions/users';



const CustomDrawer = ({ navigation }) => {
    // const navigation = useNavigation();
    const dispatch = useDispatch();

    const data = [
        { icon: Plus_Icon, title: 'HRMS', onPress: () => {  } },
        { icon: Plus_Icon, title: 'SOC', onPress: () => {  } },
        { icon: Plus_Icon, title: 'SALES', onPress: () => {  } },
        { icon: Plus_Icon, title: 'DEIVERY', onPress: () => {  } },
        { icon: Plus_Icon, title: 'CRAFTSMAN', onPress: () => {  } },
        { icon: Plus_Icon, title: 'CUSTOMER', onPress: () => {  } },
        { icon: Plus_Icon, title: 'Logout', onPress: () => Alert.alert('Logout', 'Are you sure want to logout', [{ text: 'No', style: 'cancel' }, { text: 'Yes', onPress: () => { dispatch(setLogOut(null)) } }]) },
    ];
    // const navigation = useNavigation()




    function renderItem({ item, index }) {
        return (
            <Pressable onPress={item.onPress} style={styles?.renderView} >
                <View style={styles?.IconTextView} >
                    <item.icon width={width / 15} height={width / 15} />
                    <Text style={styles?.ItemText} >{item.title}</Text>
                </View>
                <DrawerIcon width={width / 20} height={width / 30} />
            </Pressable>
        );
    }
    return (
        <View style={styles.container} >
            <View style={{ marginTop: width / 15 }} >
                <Logo_Icon width={width / 2.50} height={width / 3} />
            </View>
            <FlatList
                style={{ marginTop: width / 15 }}
                data={data}
                keyExtractor={item => item.title}
                renderItem={renderItem} />

            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width / 1.30, paddingHorizontal: 10 }} >
                <View>
                    <Text style={{ color: colors.TextColor, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Last updated at</Text>
                    <Text style={{ color: colors.TextColor, fontFamily: fonts.PoppinsRegular, fontSize: 11 }} >Time</Text>
                </View>
            </View> */}

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center',
    },
    imgContainer: {
        marginVertical: 50,
    },
    titleContainer: {
        width: width / 1.30,
        height: height / 19,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    titleText: {
        color: '#000',
    },
    IconTextView: {
        flexDirection: 'row',
        paddingLeft: 15,
    },
    renderView:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width / 1.25,
        paddingTop: 20,
        paddingBottom: 5,
        paddingRight: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.3,
    },
    ItemText: {
        fontSize: 16,
        fontFamily: fonts.PoppinsRegular,
        color: colors?.blackColor,
        paddingHorizontal: 10,
    },
});
export default CustomDrawer;
