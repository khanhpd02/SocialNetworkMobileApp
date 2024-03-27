import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/theme/LoginAndSignUp/theme'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginAndSignUpNavigator from './src/navigators/LoginAndSignUp/LoginAndSignUpNavigator'

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <LoginAndSignUpNavigator />
      </NavigationContainer>
    </Provider>
  )
}