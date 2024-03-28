import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Platform, Pressable, SafeAreaView, StyleSheet, View, TextInput, Modal, Button } from 'react-native'
import { Text, } from 'react-native-paper'
import { height, width } from '../../assets/string'
import fonts from '../../assets/fonts'
import ListItem from './ListItem'
import { colors } from '../../assets/color'
import CommonInput from '../../components/Input/CommonInput'
import { EYE_Icon, INDIA_Icon, LogoutIcon, Mail_Icon, NoTaskIcon, Plus_Icon, ProfileIcon, Task_Icon } from '../../assets/icons'
import TaskAddInput from '../../components/Input/TaskAddInput'
import CompletedListItem from './CompletedListItem'
import AppwriteContext from '../../appwrite/appWriteContext'
import Snackbar from 'react-native-snackbar'
import { useDispatch } from 'react-redux'
import { setIsloggedIn } from '../../redux/actions/user'
import { ceil } from 'react-native-reanimated'

function TodoList() {
    const [task, settask] = useState('')
    const [taskList, settaskList] = useState([])
    const [editTask, seteditTask] = useState(false)
    const [newArray, setNewArray] = useState([]);

    //NEW
    const [modalVisible, setModalVisible] = useState(false);

    const [userData, setUserData] = useState({})
    const { appwrite, setIsLoggedIn } = useContext(AppwriteContext)
    const dispatch = useDispatch();


    const handleLogout = () => {
        appwrite.logout()
            .then(() => {
                setIsLoggedIn(false);
                dispatch(setIsloggedIn(false));
                Snackbar.show({
                    text: 'Logout Successful',
                    duration: Snackbar.LENGTH_SHORT
                })
            })
    }

    useEffect(() => {
        appwrite.getCurrentUser()
            .then(response => {
                if (response) {
                    const user = {
                        name: response.name,
                        email: response.email
                    }
                    setUserData(user)
                    console?.log('UserData', response)
                }
            })
    }, [appwrite])



    const AddNewTask = (task) => {
        let tasknew = {
            id: Date.now().toString(),
            tittle: task,
        }
        settask('')
        settaskList(prevArray => [...prevArray, tasknew])
    }

    const RemoveTask = (id) => {
        let newUpdatedList = taskList?.filter((item) => item?.id !== id)
        settaskList(newUpdatedList)
    }

    const updateTask = (id, value) => {
        if (value !== '') {

            // console?.log('Add some value')
            const UpdatedList = taskList.map((item) => {
                if (item?.id === id) {
                    return { ...item, tittle: value }
                }
                return item;
            })
            return settaskList(UpdatedList)
        } else {
            return console?.log('Add some value')
        }
    }

    const moveItem = (itemId) => {
        // Find the index of the item in the original array
        const index = taskList.findIndex(item => item.id === itemId);

        // If the item exists in the original array
        if (index !== -1) {
            // Remove the item from the original array and store it
            const removedItem = taskList.splice(index, 1)[0];

            // Update the original array state
            settaskList(taskList);

            // Update the new array state by adding the removed item
            setNewArray(prevState => [...prevState, removedItem]);
        }
    }

    const moveCompItem = (itemId) => {
        // Find the index of the item in the original array
        const index = newArray.findIndex(item => item.id === itemId);

        // If the item exists in the original array
        if (index !== -1) {
            // Remove the item from the original array and store it
            const removedItem = newArray.splice(index, 1)[0];

            // Update the original array state
            setNewArray(newArray);

            // Update the new array state by adding the removed item
            settaskList(prevState => [...prevState, removedItem]);
        }
    }

    return (
        <SafeAreaView>
            <View style={styles?.TodoWrapper} >
                <View style={styles?.HeadingWrap} >
                    <Text style={styles?.TextHeading} >All Tasks</Text>
                    <Pressable style={styles?.IconTwoStyleNew} onPress={() => { setModalVisible(true) }} >
                        <ProfileIcon height={'70%'} width={'70%'} />
                    </Pressable>

                </View>
                <Modal
                    animationType="slide" // Change animationType as per your requirement
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                    style={styles?.modalstyle}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                        <Pressable onPress={() => setModalVisible(false)} style={styles?.Cross} >
                            <Text style={styles?.TextHeadingNew} >X</Text>
                        </Pressable>
                            <Text style={styles?.TextHeadingNew} >Name: {userData.name}</Text>
                            <Text style={styles?.TextHeadingNew} >Email: {userData.email}</Text>
                            <Pressable style={styles?.IconLOG} onPress={() => { handleLogout() }}  >
                            <Text style={styles?.TextHeadingNew} >Sign Out</Text>
                                <LogoutIcon height={width /14} width={width /14} />
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles?.ListView} >
                    <FlatList
                        data={taskList}
                        renderItem={({ item }) => {
                            let OtherData = {
                                RemoveTask: RemoveTask,
                                updateTask: updateTask,
                                editTask: editTask,
                                seteditTask: seteditTask,
                                moveItem: moveItem,
                            }
                            return (
                                <ListItem data={item} newData={OtherData} />
                            )
                        }}
                        ListEmptyComponent={
                            <View style={styles?.NoItem} >

                            <NoTaskIcon height={width } width={width / 1.1} />
                            </View>

                        }
                        ListFooterComponent={
                            <FlatList
                                data={newArray}
                                renderItem={({ item }) => {
                                    let OtherData = {
                                        RemoveTask: RemoveTask,
                                        moveCompItem: moveCompItem,

                                    }
                                    return (
                                        <CompletedListItem data={item} newData={OtherData} />
                                    )
                                }}

                                keyExtractor={(item) => item?.id}
                            />
                        }
                        keyExtractor={(item) => item?.id}
                    />
                </View>
                <View style={styles?.UpperView} >
                    <View style={styles?.InputWrapper} onPress={() => data?.InputPress ? data?.InputPress() : {}} >
                        <Task_Icon height={30} width={'15%'} />
                        <TextInput
                            secureTextEntry={false}
                            style={styles.input}
                            onChangeText={(text) => settask(text)}
                            value={task}
                            // editable={!data?.inputDisable}
                            placeholder={'Jot some think here'}
                            keyboardType="email-address"
                        />
                        <Pressable style={styles?.IconTwoStyle} onPress={() => { AddNewTask(task) }}  >
                            <Plus_Icon height={'70%'} width={'70%'} />
                        </Pressable>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TodoList

const styles = StyleSheet?.create({
    TodoWrapper: {
        // backgroundColor: 'red',
        width: width,
        height: height,
    },
    HeadingWrap: {
        // backgroundColor: 'pink',
        width: width,
        height: '10%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalstyle: {
        backgroundColor: 'pink',
        height: height / 2,
        width: width / 1.5,

    },
    NoItem: {
justifyContent: 'center',
alignItems:'center',
flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: height / 5,
        width: width / 1.5,
justifyContent:'space-between',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    TextHeading: {
        fontSize: 25,
        fontFamily: fonts.PoppinsLight,
    },
    TextHeadingNew: {
        fontSize: 16,
        fontFamily: fonts.PoppinsLight,
    },
    ListView: {
        // backgroundColor:'red',
        height: '70%',
        marginHorizontal: 5,
    },
    UpperView: {
        height: '12%',
        // backgroundColor:'red',
        paddingHorizontal: 20,
        zIndex: 10,
        width: width,
        // position: 'absolute',
        bottom: 0,
    },
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '75%',
    },
    IconTwoStyleNew: {
        borderRadius: width,
        backgroundColor: colors?.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 8,
        height: width / 8,
        position: 'absolute',
        left: width / 1.2,
    },
    IconTwoStyleNew: {
        borderRadius: width,
        backgroundColor: colors?.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 8,
        height: width / 8,
        position: 'absolute',
        left: width / 1.2,
    },
    Cross: {
       backgroundColor: colors?.primaryColor,
       height:  width /14,
       width: width /14,
       borderRadius: 50,
       justifyContent:'center',
       alignItems: 'center',
       textAlign: 'center',
       position:'absolute',
       right: width /70,
       top: width /70,
    },
    IconLOG: {
       backgroundColor: colors?.primaryColor,
       borderRadius: 5,
       flexDirection: 'row',
       paddingHorizontal: 15,
paddingVertical: 5,
       justifyContent:'center',
       alignItems: 'center',
    
    },

})