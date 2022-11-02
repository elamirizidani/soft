import React, { useEffect, useState } from 'react';

import { ScrollView,Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity,StatusBar,SafeAreaView,Platform, Image, FlatList, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Offers from '../components/home/Offers';
import Header from '../components/home/Header';
import Frequently from '../components/home/Frequent';
import Services from "../assets/models/services";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeScreen() {
  // AsyncStorage.removeItem('user_id');
    const paddings = useSafeAreaInsets();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getCompany = async () =>{
        
      try {
          // const response = await fetch("http://soft.com:8080/company/readCompany.php");
          const response = await fetch("https://skolpulse.rw/api/soft/company/readCompany.php");
          const json = await response.json();
          setData(json.company);
          return json.company;
      }
      catch(error) {console.error(error);}
      finally {
          setLoading(false);
      }
    }
useEffect(() => {
  getCompany();
},[]);

if(isLoading)
{
    return(<ActivityIndicator size="large"/>);
}
else
{
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
        <Image style={styles.logo} source={require('./../assets/images/logo.png')}/>
      <Frequently/>
      <Text style={styles.headerText}>Best Offers</Text>

      <FlatList
      style={styles.services}
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
      data={data}
      
      snapToInterval={Dimensions.get('screen').width}
      snapToAlignment={'center'}
      decelerationRate={'fast'}

      // keyExtractor={( item ) => item.id}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (<Offers service={item}/>)}
            />
    </SafeAreaView>
  );
}}
const styles = StyleSheet.create({
  container:{
    flex:1,
    display: 'flex',
    backgroundColor:'#f4f4f4',
    paddingTop:Platform.OS ==="android" ? StatusBar.currentHeight: 0,
  },
  mainService:{
    width: '100%',
    padding: 20
  },
  headerText:{
    fontSize: 24,
    fontWeight: '700',
    marginLeft:20
  },
  logo:{
      width: '100%',
      height: Dimensions.get('window').height *20/100,
      resizeMode: 'contain'
  },
  services:{
    height: Dimensions.get('window').height *30/100,
    paddingVertical: 20
  }
});
