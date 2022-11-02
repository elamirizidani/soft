import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { Pressable, View,Image,Text,StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceHeader=() =>{
    const route = useRoute();
    // console.log(route.params);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getUsers = async () =>{
    try {
        const userId = await AsyncStorage.getItem('user_id');
        const userProfile = JSON.parse(userId);
        if(userProfile !== null)
        {
        const response = await fetch("https://skolpulse.rw/api/soft/users/read/"+userProfile);
        // const response = await fetch("http://soft.com:8080/users/read/"+userProfile);
        const json = await response.json();
        setData(json.users);
        return json.users
    }}
catch(error) {console.error(error);}
finally {
    setLoading(false);
}
}
useEffect(() => {
getUsers();
},[]);



    const navigation = useNavigation();
    const goBack = ()=>{
        navigation.goBack();
    }
    const goToProfile =()=>{
        navigation.navigate('Profile');
    }
    return(<FlatList style={{backgroundColor: "transparent",height: Dimensions.get('window').height * 8.5/100}}
          data={data}
          scrollEnabled={false}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.topHead}>
                            <Pressable style={styles.pageName} onPress={goBack}>
                                <Ionicons name={"chevron-back"} size={35} color={"#4f4f4f"}/>
                                <Text style={styles.serviceName}>{route.params.name}</Text>
                            </Pressable>
                            <TouchableOpacity onPress={goToProfile}>
                            
                            {/* <Image
                                style={styles.profile}
                                source={{uri: 'http://soft.com:8080/assets/profile/'+item.profile}}
                                /> */}
                                <Image
                                style={styles.profile}
                                source={{uri: 'https://skolpulse.rw/api/soft/assets/profile/'+item.profile}}
                                />
                                </TouchableOpacity>
                        </View>
                         )}
                         />
    )
}

export default ServiceHeader;

const styles= StyleSheet.create({
    topHead:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    pageName:{
        display: 'flex',
        flexDirection:"row"
    },
    profile:{
        height: Dimensions.get('window').width * 12/100,
        width: Dimensions.get('window').width * 12/100,
        borderRadius: 50
      },
      serviceName:{
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
          bottom:0,
      },

})