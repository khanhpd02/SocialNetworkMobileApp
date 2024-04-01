// import React, {useCallback, useContext, useEffect, useState} from 'react';
// import Login from './src/containers/LoginAndSignUp/LoginScreen';
// import {AuthContext} from './src/context/AuthContext';
// import * as Keychain from 'react-native-keychain';
// import Dashboard from './src/components/Dashboard';
// import Spinner from './src/components/Spinner';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const App = () => {
//   const authContext = useContext(AuthContext);
//   const [token1, setToken] = useState('');
  
//   useEffect(() => {
//     AsyncStorage.getItem('token')
//     .then(token => {
//       if (token !== null) {
//         // Nếu có token được lưu trong AsyncStorage, bạn có thể sử dụng nó ở đây
//         console.log('Token from storage:', token);
//         setToken(token)
//         // Thực hiện các hành động khác tại đây nếu cần
//       } else {
//         // Nếu không có token được lưu trong AsyncStorage
//         console.log('No token found in storage');
//       }
//     })
//     .catch(error => {
//       console.log('Error retrieving token:', error);
//     });
    
//   },[token1])
 
//    if (token1=== "") {
//    return <Login />;
//    } else {
//     return <Dashboard />;
//   }
// };

// export default App;

import React, { useEffect, useState, startTransition } from 'react';
import Login from './src/containers/LoginAndSignUp/LoginScreen';
import Dashboard from './src/components/Dashboard';
import Dashboard1 from './src/containers/LoginAndSignUp/Dashboard1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditInforScreen from './src/containers/Infor/EditInforScreen';
import { RecoilRoot } from "recoil";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePostforScreen from './src/containers/CreatePost/CreatePost';
const Stack = createStackNavigator();
export default  App = () => {
  return (
    <RecoilRoot>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} 
         options={{
          // Ẩn nút back và tiêu đề
          headerLeft: null,
          headerTitle: null,
          headerShown: false,
        }} />
        <Stack.Screen name="Dashboard1" component={Dashboard1} />
        <Stack.Screen name="EditProfile" component={EditInforScreen}   options={{
          // Ẩn nút back và tiêu đề
          headerLeft: null,
          headerTitle: null,
          headerShown: false,
        }} />
        <Stack.Screen name="CreatePost" component={CreatePostforScreen}   options={{
          // Ẩn nút back và tiêu đề
          headerLeft: null,
          headerTitle: null,
          headerShown: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </RecoilRoot>
  );
};


