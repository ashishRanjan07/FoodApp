import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from '../bottom/BottomNavigation';
import MyReview from '../../screens/app/MyReview';
import CalendarScreen from '../../screens/app/CalendarScreen';
import RestaurantList from '../../screens/app/RestaurantList';
import RestaurantFoodList from '../../screens/app/RestaurantFoodList';
import CartPage from '../../screens/app/CartPage';
import FoodDetails from '../../components/search/FoodDetails';
import RestaurantsMealServices from '../../screens/app/RestaurantsMealServices';
import Success from '../../screens/app/Success';
import HomeCoockedMealServices from '../../components/Home/HomeCoockedMealServices';
import HomeCockedRestaurantList from '../../components/Home/HomeCockedRestaurantList';
import HomeCockedRestaurantFoodList from '../../components/Home/HomeCockedRestaurantFoodList';
import EditProfile from '../../screens/app/profile/EditProfile';

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
      <Stack.Screen
        name="Food Details"
        component={FoodDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Meal Services"
        component={RestaurantsMealServices}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home Cocked Meal Services"
        component={HomeCoockedMealServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home Cocked RestaurantList"
        component={HomeCockedRestaurantList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home Cocked Restaurant Food List"
        component={HomeCockedRestaurantFoodList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
