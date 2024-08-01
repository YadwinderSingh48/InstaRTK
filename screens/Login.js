import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';

const Login = () => {

  useEffect(() => {
    const perrmission = async()=>{
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log(token);
    }

    perrmission();
  }, [])
  const login = async () => {
    
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => login()} style={{ padding: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>SignIn with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})