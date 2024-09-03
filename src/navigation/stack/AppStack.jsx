import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from '../bottom/BottomNavigation';
import MyReview from '../../screens/app/MyReview';
import CalendarScreen from '../../screens/app/CalendarScreen';
import RestaurantList from '../../screens/app/RestaurantList';
import RestaurantFoodList from '../../screens/app/RestaurantFoodList';
import CartPage from '../../screens/app/CartPage';

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
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Restaurant List"
        component={RestaurantList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Restaurant Food List"
        component={RestaurantFoodList}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Cart"
        component={CartPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
