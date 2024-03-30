import React from 'react'
import Background from '../../components/LoginAndSignUp/Background'
import Logo from '../../components/LoginAndSignUp/Logo'
import Header from '../../components/LoginAndSignUp/Header'
import Paragraph from '../../components/LoginAndSignUp/Paragraph'
import Button from '../../components/LoginAndSignUp/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Dashboard1({ navigation }) {
  const Logout = () => {
    AsyncStorage.removeItem('token')
    navigation.navigate('Login')
  }
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={Logout
        }
      >
        Logout
      </Button>
    </Background>
  )
}
