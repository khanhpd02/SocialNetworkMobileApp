import React, {useContext, useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import Spinner from './Spinner';
import {

  tokenState,
} from "../recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
import { api, setAuthToken } from '../utils/helpers/setAuthToken';
const Dashboard = ({ navigation }) => {
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('idle');
  const [to, setToken] = useRecoilState(tokenState);

  const loadImage = async () => {
    setAuthToken(to)
    setStatus('loading');
    try {
      const response = await api.get('https://www.socialnetwork.somee.com/api/post');
      console.log(response)
      setImage(response.data);
      setStatus('success');
    } catch (error) {
      console.log(error)
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
     

      <View style={styles.buttonGroup}>
        <Button title="Get Image" onPress={loadImage} />
        <Button title="Logout"  onPress={() => navigation.navigate('Dashboard1')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});
export default Dashboard;