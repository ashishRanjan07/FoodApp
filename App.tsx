import {Alert, View, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import NoInternet from './src/utils/NoInternet';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';
import {Provider} from 'react-redux';
import store from './src/redux/store/Store';
import Toast from 'react-native-toast-message';
import Routes from './src/navigation/routes/Routes';

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
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Toast />
        {isConnected ? (
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        ) : (
          <NoInternet />
        )}
      </View>
    </Provider>
  );
};
export default App;
