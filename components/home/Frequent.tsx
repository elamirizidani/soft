import React from "react"
import { View,Text,ScrollView,StyleSheet, StatusBar, Platform, Image, Dimensions, Pressable } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const Frequently = ()=>{
  const navigation = useNavigation();
  const frequently = ()=>{
    // navigation.navigate('ChatWith',{
    //   name:"RURA",
    // });
  }
    return(
        <View style={styles.frequent}>
        <Text style={styles.headerText}>Frequently Services</Text>
        <View style={styles.frequentservices}>
          <Pressable 
          onPress={frequently}
          style={styles.frequentservice}>
            <Image style={styles.frequentlyLogo} source={require('../../assets/images/logorura.png')}/>
            <Text style={styles.serviceName}>RURA</Text>
          </Pressable>

          <Pressable 
          onPress={frequently} style={styles.frequentservice}>
            <Image style={styles.frequentlyLogo} source={require('../../assets/images/logorura.png')}/>
            <Text style={styles.serviceName}>RURA</Text>
          </Pressable>
          <Pressable 
          onPress={frequently} style={styles.frequentservice}>
            <Image style={styles.frequentlyLogo} source={require('../../assets/images/logorura.png')}/>
            <Text style={styles.serviceName}>RURA</Text>
          </Pressable>
        </View>
      </View>
    )
}

export default Frequently;
const styles = StyleSheet.create({
  frequent:{
    paddingVertical: 15
  },
  frequentservices:{
    paddingLeft:20,
    display: 'flex',
    flexDirection: 'row'
  },
  frequentservice:{
    marginHorizontal: 10
  },
  frequentlyLogo:{
    resizeMode: 'contain',
    width: 100,
    height: 50,
    marginBottom: 15
  },
      freque:{
        height: 80,
        marginRight: 15,
        width: 100,
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.21,
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 14
      },
      frequentService:{
      },
      headerText:{
        fontSize: 24,
        fontWeight: '700',
        marginLeft:20
      },
      serviceName:{
        fontSize:16,
        fontWeight: '600',
        position: 'absolute',
        bottom: 0,
      },
})