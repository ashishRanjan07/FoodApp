import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from '../bottom/BottomNavigation';
import MyReview from '../../screens/app/MyReview';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavBar"
        component={BottomNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="My Review"
        component={MyReview}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
