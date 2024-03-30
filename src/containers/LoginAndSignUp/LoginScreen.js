
import { Text } from 'react-native-paper'
import Background from '../../components/LoginAndSignUp/Background'
import Logo from '../../components/LoginAndSignUp/Logo'
import Header from '../../components/LoginAndSignUp/Header'
import Button from '../../components/LoginAndSignUp/Button'
import TextInput from '../../components/LoginAndSignUp/TextInput'
import BackButton from '../../components/LoginAndSignUp/BackButton'
import { theme } from '../../theme/LoginAndSignUp/theme'
import { emailValidator } from '../../utils/helpers/emailValidator'
import { passwordValidator } from '../../utils/helpers/passwordValidator'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../../context/AxiosContext';
import axios from 'axios'
  const Login = () => {
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  const publicAxios = axios.create({
    baseURL: 'https://www.socialnetwork.somee.com/api',
  });
  const onLogin = async () => {
    console.log(email,password)
    try {
      const response = await publicAxios.post('/auth/login', {
        email,
        password,
      });
      console.log(response)
      const {accessToken, refreshToken} = response.data;
      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken,
        }),
      );
    } catch (error) {
      Alert.alert('Login Failed', error.response.data.message);
    }
  };


  return (
    <Background>
      <BackButton  />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
         
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={() => onLogin()}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
export default Login;  