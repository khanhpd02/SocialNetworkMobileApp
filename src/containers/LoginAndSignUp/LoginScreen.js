
import { Text } from 'react-native-paper'
import Background from '../../components/LoginAndSignUp/Background'
import Logo from '../../components/LoginAndSignUp/Logo'
import Header from '../../components/LoginAndSignUp/Header'
import Button from '../../components/LoginAndSignUp/Button'
// import TextInput from '../../components/LoginAndSignUp/TextInput'
import BackButton from '../../components/LoginAndSignUp/BackButton'
import { theme } from '../../theme/LoginAndSignUp/theme'
 import { useRecoilState, useRecoilValue } from "recoil";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emailValidator } from '../../utils/helpers/emailValidator'
import { passwordValidator } from '../../utils/helpers/passwordValidator'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../../context/AxiosContext';
import {

  tokenState,
} from "../../recoil/initState";
import axios from 'axios'
  const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
   const [to, setToken] = useRecoilState(tokenState);
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const [token2, setToken2] = useState('');
  const [token3, setToken3] = useState('');
  const publicAxios = axios.create({
    baseURL: 'https://www.socialnetwork.somee.com/api',
  });
  useEffect(() => {
    AsyncStorage.getItem('token')
    .then(token => {
      if (token !== null) {
       
        setToken3(token)
      } else {
        setToken3("")
      }
    })
    .catch(error => {
      console.log('Error retrieving token:', error);
    });
    console.log (token3)
    if(token3 !== "") {
      navigation.navigate('Dashboard')
    }
    
  })
  const handleLogin = () => {
    fetch('https://www.socialnetwork.somee.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from login:', data);
        const token = data.data.data.jwtToken;

        AsyncStorage.setItem('token', token)
        .then(() => {
          // Sau khi đã lưu token vào AsyncStorage, bạn cần lấy lại giá trị token từ AsyncStorage
          return AsyncStorage.getItem('token');
        })
        .then(token1 => {
          // Ở đây bạn nhận được giá trị token đã được lưu vào AsyncStorage
        
          setToken2(token1 || ''); // Gán giá trị token1 vào state
        })
        .catch(error => {
          console.log(error);
        });
        
          // setToken(token)
          // console.log(to)
     
        if (data.success) {
          navigation.navigate('Dashboard1')
          // setLoggedIn(true); // Đăng nhập thành công
        } else {
          setError(data.message); // Xử lý lỗi đăng nhập
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Xử lý lỗi ở đây
        setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      });
  };

  const onLogin = async () => {
    console.log(email,password)
    try {
      const response = await publicAxios.post('https://www.socialnetwork.somee.com/api/auth/login', {
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
      console.log( error);
    }
  };


  return (
    <Background>
      <BackButton  />
      <Logo />
      <Header>Welcome back.</Header>
             <TextInput
            style={styles.input}
           placeholder="Tên đăng nhập"
             onChangeText={text => setEmail(text)}
             value={email}
           />
      {/* <TextInput
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
      /> */}
              <TextInput
           style={styles.input}
             placeholder="Mật khẩu"
             onChangeText={text => setPassword(text)}
             value={password}
             secureTextEntry
           />
      {/* // <TextInput
      //   label="Password"
      //   returnKeyType="done"
      //   value={password.value}
      //   onChangeText={(text) => setPassword({ value: text, error: '' })}
      //   error={!!password.error}
      //   errorText={password.error}
      //   secureTextEntry
      // /> */}
      <View style={styles.forgotPassword}>
        <TouchableOpacity
         
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={handleLogin}>
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