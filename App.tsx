import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
// import RegistorScreen from './screens/RegistorScreen';
 import Navigation from './navigation';
import registerNNPushToken from 'native-notify';
//  import * as Notifications from 'expo-notifications';
//  import * as Permissions from 'expo-permissions';
import { useEffect } from 'react';

export default function App() {
  registerNNPushToken(3298, 'lDBHadL4Ki15bQNQXkSdly');
//   useEffect(()=>{
//     registerForPushNotifications().then(token=>console.log(token)).catch(err => console.error(err))
//   },[] )
//   async function registerForPushNotifications(){
//     const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  
//   if(status != 'granted'){
//     const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
//   }
//   if(status != 'granted'){
//     alert('Fail to get the push token');
//     return;
//   }
//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   return token;
// }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        {/* <RegistorScreen/> */}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
