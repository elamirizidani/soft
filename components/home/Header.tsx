import React, { useEffect, useState } from "react";
import { View,Text,TouchableOpacity,Image, StyleSheet, Platform, Dimensions, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header =()=>{
    const navigation = useNavigation();
    const goToProfile = ()=> {
      navigation.navigate('Profile');
    };


    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getUsers = async () =>{
    try {
        const userId = await AsyncStorage.getItem('user_id');
        const userProfile = JSON.parse(userId);
        // console.log(userProfile);
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


    return(
      <FlatList style={{backgroundColor: "transparent",height: 20}}
          data={data}
          scrollEnabled={false}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
        <View style={styles.headerContainer}>
        <View style={styles.head}>
          <Text style={styles.header}>EveryThing Is Easy With Us</Text>
        </View>
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
};
export default Header;
const styles = StyleSheet.create({
    headerContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Platform.OS ==="android" ? 0: 20,
        height:Dimensions.get('window').height *20/100,
      },
      head:{
        width: '70%'
      },
      profile:{
        width: 60,
        height:60,
        borderRadius: 50
      },
      header:{
        fontSize: 30,
        fontWeight: '700'
      },
})