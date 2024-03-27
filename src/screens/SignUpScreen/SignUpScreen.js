import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../assets/color'
import { CrossBlack_Icon, EYE_Icon, FaceBook_Icon, FulName_Icon, Google_Icon, INDIA_Icon, Lock_Icon, Mail_Icon } from '../../assets/icons'
import { height, width } from '../../assets/string'
import fonts from '../../assets/fonts'
import CommonButton from '../../components/Button/CommonButton'
import CommonInput from '../../components/Input/CommonInput'
import { useNavigation } from '@react-navigation/native'
import NavigationStrings from '../../routes/NavigationStrings'
import { CountryPicker } from "react-native-country-codes-picker";
import CountryCodeInput from '../../components/Input/CountryCodeInput'
import { AppwriteContext } from '../../appwrite/appWriteContext'
import Snackbar from 'react-native-snackbar'
import { useDispatch } from 'react-redux'
import { setIsloggedIn } from '../../redux/actions/user'


const SignUp = () => {
    const [show, setshow] = useState(false)
    const [showCP, setshowCP] = useState(false)
    const [countryCode, setCountryCode] = useState('+91');
    const [countryFlag, setCountryFlag] = useState('');

    const { appwrite, setIsLoggedIn } = useContext(AppwriteContext)

    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const navigation = useNavigation()
    const dispatch = useDispatch();

    let ButtonData = {
        Tittle: "Create Account",
        onClick: () => { handleSignup() }
        // onClick: () => { console?.log(name) }
    }

    let InputFullName = {
        PlaceHolderTittle: "Full Name",
        IconOne: FulName_Icon,
        onChangeNumber: setName,
    }
    let InputDataEmail = {
        PlaceHolderTittle: "Email address",
        IconOne: Mail_Icon,
        onChangeNumber: setEmail,
    }
    let InputCountryPick = {
        PlaceHolderTittle: "Enter Number",
        IconOne: INDIA_Icon,
        FirstIconOrText: countryFlag,
        InputPress: () => setshowCP(true),
        ExtraVal: countryCode
    }
    let InputDataPass = {
        PlaceHolderTittle: "Password",
        IconOne: Lock_Icon,
        type: 'password',
        IconTwo: EYE_Icon,
        onChangeNumber: setPassword,
    }
    let InputDataConfirmPass = {
        PlaceHolderTittle: "Confirm Password",
        IconOne: Lock_Icon,
        type: 'password',
        IconTwo: EYE_Icon,
        onChangeNumber: setRepeatPassword,
    }



    const handleSignup = () => {
        console?.log('SIGNUP')

        if (
            name.length < 1 ||
            email.length < 1 ||
            password.length < 1 ||
            repeatPassword.length < 1
        ) {
            setError('All fields are required');
        } else if (password !== repeatPassword) {
            setError('Passwords do not match');
        } else {
            const user = {
                email,
                password,
                name,
            };
            appwrite
                .createAccount(user)
                .then((response) => {
                    if (response) {
                        setIsLoggedIn(true)
                        dispatch(setIsloggedIn(true));
                        Snackbar.show({
                            text: 'Signup success',
                            duration: Snackbar.LENGTH_SHORT
                        })
                    }
                })
                .catch(e => {
                    console.log(e);
                    setError(e.message)

                })

        }
    }

    return (
        <View style={styles?.LoginScreenWrapper} >
            <View style={styles?.UpperArea} >
                <Pressable style={styles?.crossStyle} onPress={() => { navigation?.navigate(NavigationStrings?.ON_BOARDING_SCREEN) }}  >
                    <CrossBlack_Icon height={height / 12} width={width / 6} />
                </Pressable>
                <View style={styles?.TextArea} >
                    <Text style={styles?.LoginText}>Create an account</Text>
                    <Text style={styles?.SubText} >Securely login to your account</Text>
                </View>
            </View>

            <Text style={{
                color: 'black',
                fontSize: 20
            }}>
            </Text>

            <View style={styles?.MiddleArea} >
                <CommonInput data={InputFullName} />
                <CommonInput data={InputDataEmail} />
                {/* <CountryCodeInput data={InputCountryPick} /> */}
                <CommonInput data={InputDataPass} />
                <CommonInput data={InputDataConfirmPass} />
                <CommonButton data={ButtonData} />
                <Text style={styles?.CreateText}  >I Already Have an Account <Pressable onPress={() => { navigation?.navigate(NavigationStrings?.LOGIN_SCREEN) }} ><Text style={styles?.SignUpText}>Log in</Text></Pressable></Text>
            </View>
            <CountryPicker
                show={showCP}
                style={{
                    modal: {
                        height: 500,
                        // backgroundColor: 'red'
                    },
                }}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setCountryFlag(item.flag);
                    setshowCP(false);
                }}
            />


        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    LoginScreenWrapper: {
        flex: 1,
        backgroundColor: colors?.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    UpperArea: {
        // backgroundColor: 'red',
        height: '30%',
        paddingVertical: height / 20,
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        // alignItems: 'center',
        // marginBottom
    },
    TextArea: {
        // backgroundColor: 'red',
        // paddingTop: height/20,
        position: 'relative',
        bottom: 0,
    },
    MiddleArea: {
        // backgroundColor: 'pink',
        height: '65%',
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    BottomArea: {
        // backgroundColor: 'pink',
        height: '38%',
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    crossStyle: {
        // backgroundColor: 'red',
        marginLeft: -20,
    },
    Circle: {
        backgroundColor: colors?.primaryColor,
        width: height / 70,
        height: height / 70,
        borderRadius: 500,
        position: 'absolute',
        zIndex: 2,
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
        borderWidth: 1.50,
        zIndex: 5,
    },
    LoginText: {
        color: colors?.blackColor,
        fontFamily: fonts?.PoppinsBold,
        fontSize: 22,
    },
    SubText: {
        color: colors?.greyText,
        fontFamily: fonts?.PoppinsRegular,
        fontSize: 14,
    },
    RemText: {
        color: colors?.greyText,
        fontFamily: fonts?.PoppinsLight,
        fontSize: 12,
        marginVertical: 5,
    },
    CheckBox: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'center',
        paddingHorizontal: width / 15,
        alignItems: 'center',
        marginVertical: 5,
    },
    SocialButton: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginVertical: 20,
    },
    SocialWrapper: {
        backgroundColor: colors?.SocialTileColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRadius: 500,
        // paddingVertical: 20,
        height: height / 15,
        width: width / 3,
        borderColor: colors?.SocialBorderColor,
        borderWidth: 1.5,
        marginHorizontal: 10,
    },
    ForgotText: {
        color: colors?.blueText,
        fontFamily: fonts?.PoppinsRegular,
        fontSize: 12,
        textDecorationLine: 'underline',
        marginVertical: 20,
    },
    SignUpText: {
        color: colors?.blueText,
        fontFamily: fonts?.PoppinsSemiBold,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    ContiniueText: {
        color: colors?.darkgreyText,
        fontFamily: fonts?.PoppinsMedium,
        fontSize: 12,
        marginVertical: 5,
    },
    SocialText: {
        color: colors?.darkgreyText,
        fontFamily: fonts?.PoppinsRegular,
        fontSize: 12,
        margin: 10,
    },
    CreateText: {
        color: colors?.darkgreyText,
        fontFamily: fonts?.PoppinsRegular,
        fontSize: 14,
        marginVertical: 15,
    },
    TermsText: {
        color: colors?.blackColor,
        fontFamily: fonts?.PoppinsLight,
        fontSize: 12,
        textAlign: 'center',
    },
    TermsTextBlue: {
        color: colors?.blueText,
        fontFamily: fonts?.PoppinsLight,
        fontSize: 12,
        textAlign: 'center',

    },

})