import React, { useEffect } from "react";
import { Text, View, StyleSheet,Dimensions,TouchableOpacity, Pressable, ScrollView, Platform,Image, ImageBackground } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Offers = (props: { service: { name: any; description: any;logo:any,id:any; }; }) => {
  const {id,name,description,logo} = props.service;
  const navigation = useNavigation();
      const goToServices = async() => {
        console.log(logo);
        const userRole = await AsyncStorage.getItem('role');
        const role = JSON.parse(userRole);
        const screen = role === 'agent' ? 'Agent':'Service';
        navigation.navigate(screen,
        {
          id:id,
          name:name,
          description:description
        });
      }
      
      // navigation.navigate('Service',
      // {
      //   id:id,
      //   name:name,
      //   description:description
      // });
    // };
    

    return (
      <View style={styles.section}>
      {/* <ImageBackground resizeMode={'contain'} style={styles.backgroundImage} source={{uri:"http://soft.com:8080/assets/companylogo/"+logo}}> */}
      <ImageBackground resizeMode={'contain'} 
        style={styles.backgroundImage} 
        source={{uri:`https://skolpulse.rw/api/soft/assets/companylogo/${logo}`}}>
        <Pressable onPress={goToServices} style={styles.main}>
                  {/* <Image style={styles.logo} source={{uri:"http://soft.com:8080/assets/companylogo/"+logo}}/> */}
                  <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.textdesc} numberOfLines={2}>{description}</Text>
                  </View>
              </Pressable>
    </ImageBackground></View>
    );
}

export default Offers;

const styles = StyleSheet.create({
  section:{
    flex: 1,
    width: Dimensions.get('screen').width,
    paddingHorizontal:20
  },
    main:{
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 9,

        justifyContent:'center',
        alignItems: 'center',
        
        borderRadius: 20,
        backgroundColor:'white',
        elevation: 5,
        padding:20,
        bottom: 0
      },
      title:{
        fontSize: 24,
        fontWeight: '600',
        marginVertical: 10,
        width: '100%',
        alignItems:'center'
      },
      logo:{
        width: '100px',
        height:'40px',
        resizeMode: 'contain'
      },
      backgroundImage:{
        flex:1,
        
      },
      textdesc:{
        fontSize: 18,
      }
})