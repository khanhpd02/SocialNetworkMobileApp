import React, {Component,useEffect,useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {colors} from '../utils/configs/Colors';
import Feed from '../components/Feed';
import Stories from '../components/Stories';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRecoilState, useRecoilValue } from "recoil";
import {   tokenState,likeR
} from "../recoil/initState";
import { setAuthToken, api} from "../utils/helpers/setAuthToken"
export const Dashboard = ({ navigation}) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [to, setToken] = useRecoilState(tokenState);
  const [likeRR, setLikeRR] = useRecoilState(likeR);
  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(to)
    setStatus('loading');
    try {
   
      const response = await api.get('https://www.socialnetwork.somee.com/api/post');
      // console.log(response)
      setData(response.data.data);

      setStatus('success');
    } catch (error) {
      console.log(error)
      setStatus('error');
    }
    }
    fetchData()
  },[likeRR])


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.icon}
            source={require('../assets/images/camera.jpg')}
          />
          <Image
            style={styles.logo}
            source={require('../assets/images/instagramLogo.png')}
          />
          <View style={styles.headerRightWrapper}>
            <Image
              style={styles.icon}
              source={require('../assets/images/igtv.png')}
            />
            <Image
              style={styles.icon}
              source={require('../assets/images/message.jpg')}
            />
          </View>
        </View>
        <View style={styles.storiesWrapper}>
          <Stories />
        </View>

        <ScrollView style={styles.feedContainer}>
        {
          data.map((item,index) => (
            <View key={index}>
              <Feed data= {item}/>
            </View>
          ))
        }
    
         
        </ScrollView>
        <View style={styles.footer}>
          <Icon color={colors.black} size={25} name="home" />
          <Icon color={colors.gray} size={25} name="search" />
          <Icon color={colors.gray} size={25} name="plus-square" onPress={() => navigation.navigate('CreatePost')} />
          <Icon color={colors.gray} size={25} name="heart" onPress={() => navigation.navigate('EditProfile')}  />
        </View>
      </View>
    );
  }


export default Dashboard;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: colors.gray1,
    borderBottomWidth: 1,
    marginTop:15
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'space-between',
    padding: 10,
    borderTopColor: colors.gray1,
    borderTopWidth: 1,
  },
  feedContainer: {
    display: 'flex',
  },
  icon: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 150,
    height: '100%',
  },
  headerRightWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  storiesWrapper: {
    backgroundColor: colors.gray1,
    borderBottomColor: colors.gray1,
    borderBottomWidth: 1,
  },
});
