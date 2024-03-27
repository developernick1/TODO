import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../assets/color'
import { CrossBlack_Icon, EYE_Icon, FaceBook_Icon, Google_Icon, Lock_Icon, Mail_Icon } from '../../assets/icons'
import { height, width } from '../../assets/string'
import fonts from '../../assets/fonts'
import CommonButton from '../../components/Button/CommonButton'
import CommonInput from '../../components/Input/CommonInput'
import { useNavigation } from '@react-navigation/native'
import NavigationStrings from '../../routes/NavigationStrings'
import AppwriteContext from '../../appwrite/appWriteContext'
import Snackbar from 'react-native-snackbar'
import { useDispatch } from 'react-redux'
import { setIsloggedIn } from '../../redux/actions/user'

const LoginScreen = () => {
    const [show, setshow] = useState(false)
    const {appwrite, setIsLoggedIn, isLoggedIn} = useContext(AppwriteContext);

    const [error, setError] = useState('');
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation()
    const dispatch = useDispatch();

    let ButtonData = {
        Tittle: "LOG IN",
        onClick: () => { handleLogin() }
    }

    let InputDataEmail = {
        PlaceHolderTittle: "Email address",
        IconOne: Mail_Icon,
        onChangeNumber: setEmail,
    }
    let InputDataPass = {
        PlaceHolderTittle: "Password",
        IconOne: Lock_Icon,
        type: 'password',
        IconTwo: EYE_Icon,
        onChangeNumber: setPassword,
    }

    const handleLogin = () => {
        console?.log('Login')
        if (email.length < 1 || password.length < 1) {
          setError('All fields are required')
        } else {
          const user = {
            email,
            password
          }
          appwrite
          .login(user)
          .then((response) => {
            if (response) {
              setIsLoggedIn(true);
              dispatch(setIsloggedIn(true));
              console?.log('True is not or yes',isLoggedIn )
              Snackbar.show({
                text: 'Login Success',
                duration: Snackbar.LENGTH_SHORT
              })
            }
          })
          .catch(e => {
            console.log(e);
            setEmail('Incorrect email or password')
            
          })
        }
      }


    return (
        <View style={styles?.LoginScreenWrapper} >
            <View style={styles?.UpperArea} >
                <Pressable style={styles?.crossStyle} onPress={() => {navigation?.navigate(NavigationStrings?.ON_BOARDING_SCREEN)}}  >
                    <CrossBlack_Icon height={height / 12} width={width / 6} />
                </Pressable>
                <View style={styles?.TextArea} >
                <Text style={styles?.LoginText}>Login</Text>
                <Text style={styles?.SubText} >Securely login to your account</Text>
                </View>
            </View>
            <View style={styles?.MiddleArea} >
                <CommonInput data={InputDataEmail} />
                <CommonInput data={InputDataPass} />
                <CommonButton data={ButtonData} />
            </View>
            <View style={styles?.BottomArea} >
                <Text style={styles?.ForgotText} >Forgot Password</Text>
                <Text style={styles?.ContiniueText} >- OR Continue with -</Text>
                <View style={styles?.SocialButton} >
                    <View style={styles?.SocialWrapper} >
                        <Google_Icon height={height / 25} width={height / 25} />
                        <Text style={styles?.SocialText} >Google</Text>
                    </View>
                    <View style={styles?.SocialWrapper} >
                        <FaceBook_Icon height={height / 25} width={height / 25} />
                        <Text style={styles?.SocialText} >FaceBook</Text>
                    </View>
                </View>
                <Text style={styles?.CreateText}  >Create An Account <Pressable onPress={() => {navigation?.navigate(NavigationStrings?.SIGNUP_SCREEN)}} ><Text style={styles?.SignUpText}>Sign Up</Text></Pressable></Text>
                <Text style={styles?.TermsText} >By clicking Continue, you agree to our
                    <Text style={styles?.TermsTextBlue} > Terms of Service </Text>
                    and
                    <Text style={styles?.TermsTextBlue} > Privacy Policy </Text>
                </Text>
            </View>
        </View>
    )
}

export default LoginScreen

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
        paddingVertical:height/20,
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
        bottom:0,
    },
    MiddleArea: {
        // backgroundColor: 'pink',
        height: '32%',
        width: '100%',
        justifyContent: 'center',
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