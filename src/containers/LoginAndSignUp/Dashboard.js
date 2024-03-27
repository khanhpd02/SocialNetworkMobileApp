import React from 'react'
import Background from '../../components/LoginAndSignUp/Background'
import Logo from '../../components/LoginAndSignUp/Logo'
import Header from '../../components/LoginAndSignUp/Header'
import Paragraph from '../../components/LoginAndSignUp/Paragraph'
import Button from '../../components/LoginAndSignUp/Button'

export default function Dashboard({ navigation }) {
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
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
