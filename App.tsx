import {Alert, View, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import NoInternet from './src/utils/NoInternet';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['Remote debugger']);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>
      {isConnected ? (
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      ) : (
        <NoInternet />
      )}
    </View>
  );
};
export default App;
