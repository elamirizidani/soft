import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React,{ useEffect, useState} from "react";
import { Text, View,StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import { Message } from "../../../types";
import Pdf from 'react-native-pdf';
import { useNavigation, useRoute } from "@react-navigation/native";

const Chats = (props: {chat: { id: any; Messages: any;Time:any,sender:any; }; }) =>
{
    const route = useRoute();
    const {id,Messages,Time,sender,type} = props.message;
    const [userRole, setUserRole] = useState('');
    const navigation = useNavigation();


    const getUserRole = async () => {
        const roles = await AsyncStorage.getItem('role');
          const role = JSON.parse(roles);


        const phones = await AsyncStorage.getItem('phone');
        const phone = JSON.parse(phones);

        setUserRole(role === "agent" ? role : phone)


    }
    // console.log(userRole);

    useEffect(() => {
        getUserRole();
      },[]);

    const isMyMessage = () =>{
        return sender === userRole
    }
    const isFile = () =>{
        return type === 'file' ? true:false;
    }

    const openFile = ()=>{
    }


    return(
        <View style={styles.messageContainer}>
            <View style={[styles.message,
            {backgroundColor: isMyMessage() ? '#DCF8C5':'#e5e5e5',
            marginRight: isMyMessage() ? 0:50,
            marginLeft: isMyMessage() ? 50:0,
        }
            ]}>
                
                {!isMyMessage() && <Text style={styles.name}>{sender}</Text>}
                    { isFile() &&
                        <TouchableOpacity onPress={openFile}><Text style={styles.content}>{Messages}</Text></TouchableOpacity>
                    }
                    { !isFile() && <Text style={styles.content}>{Messages}</Text>
                    }
                
                <Text style={styles.time}>{moment(Time).fromNow()}</Text>
            </View>
        </View>
    )
}

export default Chats;

const styles = StyleSheet.create({
    messageContainer:{
        padding: 10,
    },
    message:{
        color: '#fff',
        borderRadius: 5,
        padding: 10,
        marginRight: 60,
    },
    name:{
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 5
    },
    time:{
        alignSelf: 'flex-end',
        color: 'grey'
    }
})