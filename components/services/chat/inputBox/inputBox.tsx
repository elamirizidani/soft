import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"

import { TextInput, View,StyleSheet, Keyboard, Pressable } from "react-native"

const InputBox = () =>{
    const route = useRoute();
    const [textMessage, settextMessage] = useState('');
    

  const sendMessage = async () =>{
    let dataToSend = {textMessage: textMessage};
      

  const userId = await AsyncStorage.getItem('user_id');
  const getUser = JSON.parse(userId);

  const userPhone = await AsyncStorage.getItem('phone');
  const phone = JSON.parse(userPhone);

  var Data = {
    textMessage: textMessage,
    sender: phone
};


// console.log(getUser);
// console.log(phone);
  // fetch("http://soft.com:8080/chats/chat.php?user_id="+getUser+"&service="+route.params.name, {
  fetch("https://skolpulse.rw/api/soft/chats/chat.php?user_id="+getUser+"&service="+route.params.name, {
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
        
          if ((responseJson.message === "Message sent.")) {
            // console.log(responseJson.message);
        //   AsyncStorage.setItem('user_id', JSON.stringify(responseJson[0].uId));
        // console.log(responseJson.users.phone);
          // getChats();
         
        } else {
        //   setErrortext(responseJson[1].message);
        //   console.log(responseJson.status);
        }
      })
      .catch((error) => {
        //Hide Loader
        console.error(error);
      });

// settextMessage('');
  }
  useEffect(() => {
    // getChats();
    // settextMessage('');
  },[]);
    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Entypo name="attachment" size={24} color="gray"/>
                <TextInput 
                    style={styles.textInput}
                    multiline
                    placeholder="Type Here ..."

                    onChangeText={(textMessage) =>
                        settextMessage(textMessage)
                      }

                      autoCapitalize="none"
                              keyboardType="default"
                              returnKeyType="send"
                              onSubmitEditing={Keyboard.dismiss}
                              underlineColorAndroid="#f000"
                              blurOnSubmit={false}


                              
                />
            </View>
            <Pressable 
            onPress={sendMessage}
             style={styles.buttonContainer}>
                <AntDesign name="rocket1" size={24} color="black"/>
            </Pressable>
        </View>
    )
}

export default InputBox;

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        margin: 10,
    },
    mainContainer:{
        flexDirection: 'row',
        backgroundColor:'white',
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
        flex: 1,
        alignItems: 'center'
    },
    textInput:{
        flex:1,
        marginHorizontal: 10
    },
    buttonContainer:{
        backgroundColor:'#DCF8C5',
        borderRadius: 50,
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})