import React from "react";
import { View,Text,TouchableOpacity,Image, StyleSheet, TouchableWithoutFeedback, Dimensions, Platform, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ServiceList =(props: { services: { name: any; id:any;serviceDescription:any }; }) => {
    const {id,name,serviceDescription} = props.services;
const navigation = useNavigation();
    const route = useRoute();
    const goToChat = ()=>{
    
        navigation.navigate("ChatWith",
        {
            name:route.params.name,
        });
    }
    
    return(
        <TouchableWithoutFeedback onPress={goToChat}>
                            <View style={styles.service}>
                                <Image
                                    style={styles.serviceImg}
                                    source={require('./../../assets/images/z.jpg')}
                                    />
                                    <View style={styles.serviceBody}>
                                        <Text style={styles.serviceTitle}>{name}</Text>
                                        <Text style={styles.serviceDescription} numberOfLines={2}>
                                        {serviceDescription}
                                        </Text>
                                    </View>
                            </View></TouchableWithoutFeedback>
    )
}

export default ServiceList;

const styles = StyleSheet.create({
    container:{
        flex:1,
      display: 'flex',
      backgroundColor: '#fff',
      paddingTop:Platform.OS ==="android" ? StatusBar.currentHeight: 0,
    },
    serviceDesc:{
        paddingHorizontal: 20
    },
    mainHeader:{
        width: '100%',
        backgroundColor: '#f4f4f4',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: Dimensions.get('window').height * 30/100,
    },
    
      serviceName:{
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
          bottom:0,
      },

      //body

      mainBody:{
          width: '100%',
          height: Dimensions.get('window').height * 65/100,
          padding: 20
      },
      services:{},
      service:{
          display: 'flex',
          flexDirection: 'row',
          height: Dimensions.get('window').height * 8/100,
          marginBottom: 10
      },
      serviceImg:{
          width: '20%',
          height: '100%',
          marginRight: 10
      },
      serviceBody:{
        width: '80%',
      },
      serviceDescription:{
          fontSize: 10,
          color: 'grey'
      },
      serviceTitle:{
          fontWeight: '700'
      }
})