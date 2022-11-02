// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
 
// Import React and Component
import React, {useState, createRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import Loader from './../components/Loader';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
 
const LoginScreen = ({navigation}) => {

  
  const [userPhone, setuserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 
  const passwordInputRef = createRef();
 
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userPhone) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {phone: userPhone, password: userPassword};
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');


    var Data = {
      phone: userPhone,
      password: userPassword,
  };
 
    // fetch('http://soft.com:8080/users/login.php', {
      fetch('https://skolpulse.rw/api/soft/users/login.php', {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        // console.log(responseJson);
        // If server response message same as Data Matched
        // if (responseJson.status === 200) {


          if ((responseJson[1].message === "userLoged") || responseJson.message === "userLoged") {
            
            // console.log(responseJson);

          AsyncStorage.setItem('user_id', JSON.stringify(responseJson[0].uId));
          AsyncStorage.setItem('phone', JSON.stringify(responseJson[0].phone));
          AsyncStorage.setItem('role', JSON.stringify(responseJson[0].role));

          // console.log(responseJson.users.phone);
          navigation.replace('Home');
        } else {
          setErrortext(responseJson[1].message);
          // console.log(responseJson.status);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
 
  return (
    <View style={styles.mainContainer}>
      <Loader loading={loading} />
      
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
          <KeyboardAvoidingView style={[styles.Container,{ flex:1}]} enabled>

            
<View style={styles.topView}>
              <Image
                source={require('./../assets/images/logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
                <View style={styles.bottomView}>
                    
                        <Text style={styles.title}>Welcome back</Text>
                    
                    <View style={styles.loginForm}>
                        <View  style={styles.formField}>

                        <View style={styles.inputIcon}>
                          <FontAwesome style={styles.icon} name="mobile-phone" size={30} color="#FF0FF0"/>
                          <TextInput
                              style={styles.txtStyle}placeholder={"Phone Number"}
                              placeholderTextColor={"#FF0FF0"}
                              onChangeText={(userPhone) =>
                                setuserPhone(userPhone)
                              }
                              autoCapitalize="none"
                              keyboardType="email-address"
                              returnKeyType="next"
                              onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                              }
                              underlineColorAndroid="#f000"
                              blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.inputIcon}>
                          <AntDesign style={styles.icon} name="lock" size={24} color="#FF0FF0"/>
                          <TextInput
                              style={styles.txtStyle}
                              placeholderTextColor={"#FF0FF0"}
                              onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                              }
                              placeholder="Enter Password" //12345
                              keyboardType="default"
                              ref={passwordInputRef}
                              onSubmitEditing={Keyboard.dismiss}
                              blurOnSubmit={false}
                              secureTextEntry={true}
                              underlineColorAndroid="#f000"
                              returnKeyType="next"
                              />
                        </View>
                            
                            {errortext != '' ? (
                      <Text style={styles.errorTextStyle}>
                        {errortext}
                      </Text>
                    ) : null}
                            <View style={styles.rember}><Text>Forgot password?</Text></View>
                            </View>
                    </View>
                    


                    <View style={styles.signUp}>
                            <View style={styles.signUpTop}>
                                <Text style={styles.signUpText}>Sign in</Text>
                                <Pressable onPress={handleSubmitPress} style={styles.signUpIcon}>
                                    <Ionicons name={"chevron-forward"} size={24} color={"#fff"}/>
                                </Pressable>
                            </View>
                            <Pressable onPress={() => navigation.navigate('Registor')}><Text style={styles.signUpBottom}>Sign Up</Text></Pressable>
                            
                        </View>
                </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </View>
  );
};
export default LoginScreen;
 
const styles = StyleSheet.create({
  // mainBody: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: '#307ecc',
  //   alignContent: 'center',
  // },
  // SectionStyle: {
  //   flexDirection: 'row',
  //   height: 40,
  //   marginTop: 20,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   margin: 10,
  // },
  // buttonStyle: {
  //   backgroundColor: '#7DE24E',
  //   borderWidth: 0,
  //   color: '#FFFFFF',
  //   borderColor: '#7DE24E',
  //   height: 40,
  //   alignItems: 'center',
  //   borderRadius: 30,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   marginTop: 20,
  //   marginBottom: 25,
  // },
  // buttonTextStyle: {
  //   color: '#FFFFFF',
  //   paddingVertical: 10,
  //   fontSize: 16,
  // },
  // inputStyle: {
  //   flex: 1,
  //   color: 'white',
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderWidth: 1,
  //   borderRadius: 30,
  //   borderColor: '#dadae8',
  // },
  // registerTextStyle: {
  //   color: '#FFFFFF',
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 14,
  //   alignSelf: 'center',
  //   padding: 10,
  // },
  // errorTextStyle: {
  //   color: 'red',
  //   textAlign: 'center',
  //   fontSize: 14,
  // },




  mainContainer:{
    display: 'flex',
    flex:1,
    justifyContent: 'space-between',
},
Container:{
  display: 'flex',
  paddingTop: 20,
  flex:1,
  justifyContent: 'space-between'
},
topView:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
},
bottomView:{
    width: '100%',
    height: Dimensions.get('window').height *60/100,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius:25,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifySelf:'flex-end',
},
title:{
    fontSize: 30,
  fontWeight: '800',
  flex: 1
},
loginForm:{
    width: '100%',
    // height: '60%',
    flex: 4,
    
},
formField:{
    width: '100%',
    height:'60%',
    display: 'flex',
    gap: 5,
    justifyContent: 'center',
    marginVertical: 30
},
inputIcon:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:'#fff',
  borderBottomColor: '#FF0FF0',
  width:'100%',
},
icon:{
  padding:10,
},
txtStyle:{
  // borderBottomColor: '#FF0FF0',
  flex:1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 10,
  // marginTop: 10,
  paddingLeft: 0,
  backgroundColor:'#fff',
  // color:'#424242',

  borderBottomWidth: 1,
  borderBottomColor: '#FF0FF0',
  marginBottom: 20,
},
rember:{
    display: 'flex',
    alignItems: 'flex-end',
},
signUp:{
  flex:1.5,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
},
signUpTop:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    
},
signUpText:{
    fontSize: 20,
    fontWeight: '600'
},
signUpIcon:{
    backgroundColor:'#000',
    padding:10,
    borderRadius:50,
},
signUpBottom:{
  textDecorationLine: 'underline',
  textDecorationStyle: 'dotted',
  textDecorationColor: '#FF0FF0'
}
});
