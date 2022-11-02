import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image,Text, View, StyleSheet,TouchableOpacity, SafeAreaView, Platform, StatusBar, Pressable, FlatList, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ServiceList from "../components/services/ServiceList";

import Services from "../assets/models/services";
import ServiceHeader from "../components/services/header";
import { useRoute } from "@react-navigation/native";

const ServiceScreen = ()=>{
    const navigation = useNavigation();
    const route = useRoute();

    // console.log(route.params);
const goToChat = ()=>{
    navigation.navigate("ChatWith",
    {
        name:route.params.name,
    });
}
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getServiceList= async () =>{
        try{
            // const response = await fetch("http://soft.com:8080/service/readService.php?id="+route.params.id);
            const response = await fetch("https://skolpulse.rw/api/soft/service/readService.php?id="+route.params.id);
            const json = await response.json();
            setData(json.services);
            return json.services;
        }
            catch(error) {console.error(error);}
            finally {
                setLoading(false);
            }
          }
      useEffect(() => {
        getServiceList();
      },[]);
    
    return(
        <SafeAreaView style={[{backgroundColor: 'white'},styles.mainSafe]}>
            
            <View style={styles.container}>
                <View style={styles.mainHeader}>
                        <ServiceHeader/>
                        <View style={styles.serviceDesc}>
                            <Text>
                            {route.params.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.mainBody}>
                        <View style={styles.services}>
                            <FlatList
                            data={data}
                            // keyExtractor={( item ) => item.id}
                            keyExtractor={({ id }, index) => id}
                            renderItem={({ item }) => (
                                // <TouchableWithoutFeedback onPress={goToChat}>
                                //     <View style={styles.service}>
                                //         <Image
                                //             style={styles.serviceImg}
                                //             source={require('./../assets/images/z.jpg')}
                                //             />
                                //             <View style={styles.serviceBody}>
                                //                 <Text style={styles.serviceTitle}>{item.name}</Text>
                                //                 <Text style={styles.serviceDescription} numberOfLines={2}>
                                //                 {item.serviceDescription}    
                                //                 </Text>
                                //             </View>
                                //     </View>
                                // </TouchableWithoutFeedback>

                                <ServiceList services={item}/>
                                )}
                            />

                            
                        </View>
                    </View>
            </View>
        </SafeAreaView>
        )
    }

export default ServiceScreen;
const styles = StyleSheet.create({
    mainSafe:{
        flex:1,
        display: 'flex',
    },
    container:{
        flex:1,
      display: 'flex',
      backgroundColor: '#fff',
      color:'#000',
      paddingTop:Platform.OS ==="android" ? StatusBar.currentHeight: 0,
    },
    serviceDesc:{
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent:'flex-start',
        alignItems: 'center',
    },
    mainHeader:{
        width: '100%',
        backgroundColor: '#f4f4f4',
        borderBottomRightRadius: 50,
        paddingBottom: 20,
        justifyContent: 'flex-start',
        // height: Dimensions.get('window').height * 40/100,
        display: 'flex',
        // height:Dimensions.get('window').height * 30/100
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
  });
  