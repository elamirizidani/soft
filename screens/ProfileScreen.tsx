import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import React,{useState,useEffect, Component } from "react";
import { ActivityIndicator,FlatList,Image, SafeAreaView, Text,View,StyleSheet, ImageBackground, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../components/profile";




const ProfileScreen = () =>{

    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getUsers = async () =>{
        
        try {
            const userId = await AsyncStorage.getItem('user_id');
            const userProfile = JSON.parse(userId);
            if(userProfile !== null)
            {
            // const response = await fetch("http://soft.com:8080/users/read/"+userProfile);
            const response = await fetch("https://skolpulse.rw/api/soft/users/read/"+userProfile);
            const json = await response.json();
            setData(json.users);
            return json.users
        }
    }
    catch(error) {console.error(error);}
    finally {
        setLoading(false);
    }
}

useEffect(() => {
    getUsers();
},[]);



    const editProfile =()=>{
    }
    const goBack = ()=>{
        navigation.goBack();
    }
    
        
            if(isLoading)
            {
                return(<ActivityIndicator size="large"/>);
            }
            else
            {
                return(
                    
                <View>
                    <FlatList 
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (<Profile profile={item}/>)}
                    />
                </View>
            )
            }
            
       
    
}
export default ProfileScreen;

const styles = StyleSheet.create({
    

})