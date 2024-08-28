import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Welcome from './src/screens/auth/Welcome';
import NoInternet from './src/utils/NoInternet';
import NetInfo from '@react-native-community/netinfo';
import Login from './src/screens/auth/Login';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>{isConnected ? <Login /> : <NoInternet />}</View>
  );
};
export default App;

const styles = StyleSheet.create({});
