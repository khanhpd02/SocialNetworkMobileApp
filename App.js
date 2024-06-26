import React from 'react';
import { Suspense } from 'react';
import { RecoilRoot } from "recoil";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatContextProvider } from './src/context/ChatContext';
import Login from './src/containers/LoginAndSignUp/LoginScreen';
import FeedScreen from './src/containers/Feed/FeedScreen';
import EditInforScreen from './src/containers/Infor/EditInforScreen';
import CreatePostforScreen from './src/containers/CreatePost/CreatePost';
import RegisterScreen from './src/containers/LoginAndSignUp/RegisterScreen';
import BottomTabNav from './src/containers/Test/BottomTabNav';
import VertifyPinScreen from "./src/containers/LoginAndSignUp/VertifyPinScreen"
import { Profile } from './src/containers/Test';
import CreateInfoScreen from './src/containers/CreateInfo/CreateInfo';
import ChatMessagesScreen from "./src/components/ChatMessagesScreen/ChatMessagesScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
      <ChatContextProvider>
    <RecoilRoot>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="BottomTabNavigation" component={BottomTabNav} options={{ headerShown: false }} />
            <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditInforScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateInfo" component={CreateInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreatePost" component={CreatePostforScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VertifyPinScreen" component={VertifyPinScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChatMessagesScreen" component={ChatMessagesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
    </RecoilRoot>

      </ChatContextProvider>
  );
};

const Root = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={console.log("load")}>
      <App />

      </Suspense>
    </RecoilRoot>
  );
};

export default Root;
