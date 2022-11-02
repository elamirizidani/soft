import { AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View,StyleSheet, FlatList, ImageBackground, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, Pressable, Keyboard } from "react-native";
import chat from "../assets/models/chat";
import Chats from "../components/services/chat/Chats";
import InputBox from "../components/services/chat/inputBox/inputBox";
import ServiceHeader from "../components/services/header"
import * as DocumentPicker from "expo-document-picker";


const ChatScreen = () =>{
    const route = useRoute();
    const [isLoading, setLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const [sender, setSender] = useState('');

    const getChats = async () => {
        try{
          
          const roles = await AsyncStorage.getItem('role');
          const role = JSON.parse(roles);

          const userId = await AsyncStorage.getItem('user_id');
          const login = JSON.parse(userId);

        const getUser = role === "agent" ?  route.params.user : login;
            // const response = await axios.get("http://soft.com:8080/chats/readChats.php?user_id="+getUser+"&service="+route.params.name);
            const response = await axios.get("https://skolpulse.rw/api/soft/chats/readChats.php?user_id="+getUser+"&service="+route.params.name);
             
            const json = response.data;
            setChats(json.chat);
            // console.log(json.chat)
            return json.chat;
        }
        catch(error) {console.error(error);}
            finally {
                setLoading(false);
            }
    }



    const [textMessage, settextMessage] = useState('');

    const getUserRole = async () => {
    const roles = await AsyncStorage.getItem('role');
    const role = JSON.parse(roles);


      const phones = await AsyncStorage.getItem('phone');
      const phone = JSON.parse(phones);

      setSender(role === "agent" ? role : phone);
  }
  // console.log(userRole);

  useEffect(() => {
      getUserRole();
    },[]);
    

  const sendMessage = async () =>{
    let dataToSend = {textMessage: textMessage};

    const userId = await AsyncStorage.getItem('user_id');
    const login = JSON.parse(userId);
    

    const getUser = sender === "agent" ?  route.params.user : login;

  var Data = {
    textMessage: textMessage,
    sender: sender
};


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
          
        //   useEffect(() => {
        //     getChats();
        //   },[]);
        getChats();
         
        } else {
        //   setErrortext(responseJson[1].message);
        //   console.log(responseJson.status);
        }
      })
      .catch((error) => {
        //Hide Loader
        console.error(error);
      });

    settextMessage('');
  }



    useEffect(() => {
        getChats();
      },[]);

      const [selectedFile, setSelectedFile] = useState(false);
      const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          type: "application/*"
        });
        // console.log(result.uri);
        console.log(result);
        if (!result.cancelled) {
        setSelectedFile(result.file);
        uploadFile(result.file);
        
        }
      };


      const uploadFile = async (result) => {

        const userId = await AsyncStorage.getItem('user_id');
        const login = JSON.parse(userId);
    

    const getUser = sender === "agent" ?  route.params.user : login;

    // console.log(getUser);
    // console.log(route.params.user);
    // console.log(login);
    // console.log(sender);


        const payload = new FormData();
        payload.append('image', result);
        console.log(payload);
        payload.append('type', 'file');
        payload.append('sender', sender);
        payload.append('user_id', getUser);
        payload.append('service', route.params.name);

        const config = {
          body: payload,
          method: 'POST',
          contentType: false,
          processData: false,
        };
    
        // let response = await fetch('http://soft.com:8080/chats/uploadDoc.php', config);
        let response = await fetch('https://skolpulse.rw/api/soft/chats/uploadDoc.php', config);
        getChats();
        // console.log(response);
        // console.log(config);
      }


      
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    return(
        <SafeAreaView style={{height: '100%'}}>
            
            <ImageBackground style={{width: '100%', height: '100%'}} source={require('../assets/images/bg/bg1.jpg')}>
            <KeyboardAvoidingView  keyboardVerticalOffset={keyboardVerticalOffset}
        style={{flex: 1}} 
  behavior={'padding'} 
        >
                <ServiceHeader/>
                <FlatList 
                    data={chats} 
                    keyExtractor={( item ) => item.id}
                    // ref={flatListRef}
                    inverted
                    contentContainerStyle={{flexDirection:'column-reverse'}}
                    renderItem={({ item }) =>(<Chats message={item}/>)}
                />
                {/* <InputBox/> */}




                <View style={styles.container}>
            <View style={styles.mainContainer}>
              <Pressable onPress={pickDocument}>
                <Entypo name="attachment" size={24} color="gray"/>
                </Pressable>
                
                <TextInput 
                    style={styles.textInput}
                    multiline
                    placeholder="Type Here ..."

                    onChangeText={(textMessage) =>
                        settextMessage(textMessage)
                      }
                      value={textMessage}

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



                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        margin: 10,
    },
    messageContainer:{
        padding: 10
    },
    message:{
        backgroundColor: '#e5e5e5',
        color: '#fff',
        borderRadius: 5,
        padding: 10,
        marginRight: 60,
        
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