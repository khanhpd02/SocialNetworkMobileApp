import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StartScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, Dashboard } from '../../containers/LoginAndSignUp'

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}
