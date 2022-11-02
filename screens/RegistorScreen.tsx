import React, { Component, useEffect, useState } from "react";
import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Button,StyleSheet,SafeAreaView, Text,Keyboard, TextInput, View,Image, TouchableOpacity, Pressable, Platform, TouchableWithoutFeedback } from "react-native";


const DismissKeyboard = ({children}) =>(
    <TouchableWithoutFeedback>
        {children}
    </TouchableWithoutFeedback>
);

const RegistorScreen = () => {
    const navigation = useNavigation();
    const goToHome =()=>{
        navigation.navigate('Root');
    }
    const goToLogin =()=>{
        navigation.navigate('Root');
    }


    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;


    const [Names, setNames] = useState("");
    const [Phone, setPhone] = useState("");
    const [Location, setLocation] = useState("");
    const [Work, setWork] = useState("");
    const [Password, setPassword] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        var Data = {
            names: Names,
            phone: Phone,
            location: Location,
            work: Work,
            password: Password,
        };
        Keyboard.dismiss;
        const authenticate = async () => {
            await axios.post("https://skolpulse.rw/api/soft/users/createUser.php",
                // await axios.post("http://soft.com:8080/users/create.php",
                JSON.stringify(Data)
            ).then((response) => {
                if(response.status === 200)
{
    goToHome();
}
else{
    alert(JSON.stringify(response.data));
}
                setIsSubmit(false);
            })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (isSubmit) authenticate();
    }, [isSubmit]);

    
    return(
        <DismissKeyboard>
            <View style={styles.mainContainer}>
                <View style={styles.topView}>
                    {/* <Image style={styles.topIcon} source={require('./../assets/images/z.jpg')}/> */}
                </View>
                <View style={styles.bottomView}>
                    
                        <Text style={styles.title}>Welcome back</Text>
                    
                    <View style={styles.loginForm}>
                        <View style={styles.formField}>
                        <View style={styles.ViewStyle}>
            <View style={styles.inputIcon}>
                <Entypo style={styles.icon} name="add-user" size={24} color="#FF0FF0"/>
                <TextInput
                    style={styles.txtStyle}
                    placeholder={"Names"}
                    placeholderTextColor={"#FF0FF0"}

                    onChangeText={(text) => setNames(text)}
                />
            </View>

            <View style={styles.inputIcon}>
                <FontAwesome style={styles.icon} name="mobile-phone" size={34} color="#FF0FF0"/>
                <TextInput
                    style={styles.txtStyle}
                    placeholder={"Phone"}
                    placeholderTextColor={"#FF0FF0"}
                    onChangeText={(text) => setPhone(text)}
                />
            </View>

            <View style={styles.inputIcon}>
                <Ionicons style={styles.icon} name="location" size={24} color="#FF0FF0"/>
                <TextInput
                    style={styles.txtStyle}
                    placeholder={"Location"}
                    placeholderTextColor={"#FF0FF0"}
                    onChangeText={(text) => setLocation(text)}
                />
            </View>

            <View style={styles.inputIcon}>
                <MaterialIcons style={styles.icon} name="work" size={24} color="#FF0FF0"/>
                <TextInput
                    style={styles.txtStyle}
                    placeholder={"Work"}
                    placeholderTextColor={"#FF0FF0"}
                    onChangeText={(text) => setWork(text)}
                />
            </View>

            <View style={styles.inputIcon}>
                <AntDesign style={styles.icon} name="lock" size={24} color="#FF0FF0"/>
                <TextInput
                    style={styles.txtStyle}
                    placeholder={"Create Password"}
                    placeholderTextColor={"#FF0FF0"}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
        </View>
                        </View>
                    </View>
                    <View style={styles.signUp}>
                            <View style={styles.signUpTop}>
                                <Text style={styles.signUpText}>Sign Un</Text>
                                <Pressable onPress={() => setIsSubmit(true)} style={styles.signUpIcon}>
                                    <Ionicons name={"chevron-forward"} size={24} color={"#fff"}/>
                                </Pressable>
                            </View>
                            
                            <Pressable onPress={() => navigation.navigate('Root')}><Text style={styles.signUpBottom}>Sign In</Text></Pressable>
                            
                        </View>
                </View>
            </View>
            </DismissKeyboard>
    )
}

export default RegistorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
      mainContainer:{
          display: 'flex',
          flex:1,
          justifyContent: 'space-between'
      },
      topView:{
          display: 'flex',
          alignItems: 'flex-end',
          flex: 1,
      },
      bottomView:{
          width: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 25,
          borderTopRightRadius:25,
          padding: 20,
          display: 'flex',
          flex:2,
          alignItems: 'center'
      },
      title:{
          flex:1,
          fontSize: 30,
        fontWeight: '800'
      },
      loginForm:{
          width: '100%',
          flex: 4,
          
      },
      formField:{
          width: '100%',
          display: 'flex',
          gap: 5,
          flex:1,
          justifyContent: 'center',
      },
      
      rember:{
          display: 'flex',
          alignItems: 'flex-end',
      },
      signUp:{
        flex:1.2,
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
      },
      ViewStyle: {
        flex: 1,
        padding: 20,
        marginTop: 10
    },
    inputIcon:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        borderBottomColor: '#FF0FF0',
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

})