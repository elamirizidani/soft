import React, { useEffect, useState } from "react";
import { View,Text,TouchableOpacity,Image, StyleSheet, TouchableWithoutFeedback, Dimensions, Platform, StatusBar, SafeAreaView, ImageBackground, Pressable, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const Profile =(props: { profile: { names: any; id:any;profile:any;work:any;location:any;phone:any }; }) => {
    const {names,profile,work,location,phone} = props.profile;
    const navigation = useNavigation();
    const route = useRoute();

    // const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    

    const Logout = () =>{
        AsyncStorage.removeItem('user_id');
        navigation.navigate('Root');
    }
    const editProfile =()=>{
    }
    const goBack = ()=>{
        navigation.goBack();
    }


    const getUserFiles = async ()=>{
        try{
            // const response = await fetch(`http://soft.com:8080/uploads/index.php?phone=${phone}`);
            const response = await fetch(`https://skolpulse.rw/api/soft/uploads/index.php?phone=${phone}`);
            const json = await response.json();
            setData(json.upload);
            // console.log(json.upload);
            return json.upload
        }
        catch (error){console.error(error);}
        finally {
            // setLoading(false);
        }
    }
    useEffect(() => {
        getUserFiles();
    },[]);
    
    return(
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.profileHeaderBg} source={{uri: 'https://skolpulse.rw/api/soft/assets/profile/'+profile}}>
            {/* <ImageBackground style={styles.profileHeaderBg} source={{uri: 'http://soft.com:8080/assets/profile/'+profile}}> */}
                <Pressable onPress={goBack} style={styles.backIcon}>
                    <Ionicons name={"chevron-back"} size={35} color={"#4f4f4f"}/>
                </Pressable>
                <View style={styles.mainProfile}>
                    <View>
                        <Image style={styles.profileImage} source={{uri: 'https://skolpulse.rw/api/soft/assets/profile/'+profile}}/>
                        {/* <Image style={styles.profileImage} source={{uri: 'http://soft.com:8080/assets/profile/'+profile}}/> */}
                        <Text style={styles.profileName}>{names}</Text>
                        <Text style={styles.profileBusiness}>{work}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.profileBody}>
                <View style={styles.profileTitle}>
                    <Text style={styles.profileName}>{names}</Text>
                    <Pressable 
                        onPress={editProfile}
                        style={styles.editIcon}>
                            <AntDesign name="edit" size={24} color="#171717"/>
                    </Pressable>
                </View>
                <View style={styles.proDetails}>
                    <View style={styles.profileItems}>
                        
                        <View style={styles.profileItem}>
                            <View style={styles.editIcon}>
                                <AntDesign name="phone" size={24}/>
                            </View>
                            <View style={styles.name}>
                                <Text>{phone}</Text>
                            </View>
                        </View>
                        <View style={styles.profileItem}>
                            <View style={styles.editIcon}>
                                <EvilIcons name="location" size={24}/>
                            </View>
                            <View style={styles.name}>
                                <Text>{location}</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.logout}>
                            <Pressable style={styles.logoutButton} onPress={Logout}>
                                <Text>LOGOUT</Text>
                                
                                </Pressable>
                        </View>
                        <View style={styles.uploads}>
                            <Text style={styles.uploadsTitle}>Uploaded Files</Text>
                            <View style={styles.uploadsBody}>
                            <FlatList 
                                data={data}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                    <View style={styles.upload}>
                                        <View style={styles.editIcon}>
                                            <Entypo name="documents" size={24}/>
                                        </View>
                                        <View style={styles.uploadBdy}>
                                            <Text style={styles.uploadName}>{item.fileName}</Text>
                                            <Text>{item.service}</Text>
                                            <Text style={styles.date}>{moment(item.uploadedDate).format('LLL')}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    
                </View>
            </View> 
            </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f4f4f4',
        display: 'flex',
        // height:Dimensions.get('screen').height,
    },
    uploads:{
        marginVertical: 20,
    },
    uploadsTitle:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    uploadsBody:{
        marginVertical: 15,
        display: 'flex',

    },
    upload:{
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 7
    },
    uploadBdy:{
        marginLeft:15,
    },
    uploadName:{
        fontWeight: '600',
        fontSize: 17,
        flexWrap:'wrap',
        width: '100%',
    },
    date:{
        fontSize: 12,
        color: 'skyblue'
    },



    profileHeaderBg:{
        width: '100%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    mainProfile:{
        width: '80%',
        backgroundColor: '#FFF',
        marginTop: 60,
        marginBottom: -80,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 9,
        padding: 20,
        borderRadius: 15
    },
profileImage:{
        height: 70,
        width: 90,
        borderRadius: 10,
        alignItems: 'flex-end',
        bottom: 10,
        alignSelf: 'center'
    },
    profileName:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    profileBusiness:{
        color: 'grey'
    },
    profileBody:{
        width:Dimensions.get('screen').width,
        // height:Dimensions.get('screen').height * 70/100,
        marginTop:80,
        padding: 20,
        // display: 'flex',
        // backgroundColor: '#fff'
    },
    profileTitle:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    editIcon:{
        width: 40,
        height:40,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 9,
        backgroundColor:'#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileItems:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 4,
    },
    profileItem:{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 8
    },
    name:{
        marginLeft:10,
        width: '80%',
        borderBottomWidth: 0.2,
        borderColor: 'skyblue',
        justifyContent: 'center'
    },

    backIcon:{
        width: 45,
    },
    proDetails:{
        display: 'flex',
        justifyContent:'space-between',
        flex: 1,
    },
    logout:{
        marginTop:30,
flex: 1,
justifyContent:'center',
display: 'flex',
alignItems: 'center',
    },
    logoutButton:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor: 'red',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.21,
        shadowRadius: 6,
        color: '#FFFFFF'
    }
})