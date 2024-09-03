import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Home from '../../screens/app/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {responsive} from '../../utils/Responsive';
import {AppColor} from '../../utils/AppColor';
import Profile from '../../screens/app/Profile';
import Notification from '../../screens/app/Notification';
import Cart from '../../screens/app/Cart';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Search from '../../screens/app/Search';
const Tab = createMaterialBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      activeColor="#e91e63"
      barStyle={{backgroundColor: AppColor.yellow}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={responsive(26)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="search"
              color={color}
              size={responsive(26)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="notifications"
              color={color}
              size={responsive(26)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Feather name="user" color={color} size={responsive(26)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
