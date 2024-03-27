import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Platform, Pressable, SafeAreaView, StyleSheet, View, TextInput } from 'react-native'
import { Text, } from 'react-native-paper'
import { height, width } from '../../assets/string'
import fonts from '../../assets/fonts'
import ListItem from './ListItem'
import { colors } from '../../assets/color'
import CommonInput from '../../components/Input/CommonInput'
import { EYE_Icon, INDIA_Icon, Mail_Icon, Plus_Icon, Task_Icon } from '../../assets/icons'
import TaskAddInput from '../../components/Input/TaskAddInput'
import CompletedListItem from './CompletedListItem'
import AppwriteContext from '../../appwrite/appWriteContext'
import Snackbar from 'react-native-snackbar'
import { useDispatch } from 'react-redux'
import { setIsloggedIn } from '../../redux/actions/user'

function TodoList() {
    const [task, settask] = useState('')
    const [taskList, settaskList] = useState([])
    const [editTask, seteditTask] = useState(false)
    const [newArray, setNewArray] = useState([]);

    //NEW
    const [userData, setUserData] = useState({})
    const { appwrite, setIsLoggedIn } = useContext(AppwriteContext)
    const dispatch = useDispatch();


    const handleLogout = () => {
        appwrite.logout()
            .then(() => {
                setIsLoggedIn(false);
                dispatch(setIsloggedIn(true));
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
                    {/* <Pressable style={styles?.IconTwoStyle} onPress={() => { handleLogout() }}  >
                        <INDIA_Icon height={'70%'} width={'70%'} />
                    </Pressable> */}
                </View>

                {/* <View style={styles?.HeadingWrap} >
                    <Text style={styles?.TextHeading} >Name: {userData.name}</Text>
                </View>
                
                <View style={styles?.HeadingWrap} >
                    <Text style={styles?.TextHeading} >Email: {userData.email}</Text>
                </View> */}

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
        backgroundColor: 'pink',
        width: width,
        height: '10%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextHeading: {
        fontSize: 25,
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
        //    backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '75%',
    },

})