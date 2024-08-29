import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pending from './Pending';
import Published from './Published';
import CustomHeader from '../../components/CustomHeader';
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Tab = createMaterialTopTabNavigator();

const MyReview = () => {
  const CustomTabBarItem = ({iconName, label}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MaterialIcons
        name={iconName}
        size={responsive(30)}
        color={AppColor.success}
      />
      <Text
        style={{
          marginLeft: responsive(10),
          fontSize: responsive(18),
          fontFamily: 'NotoSans-Medium',
          color: AppColor.success,
        }}>
        {label}
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor={AppColor.yellow} barStyle={'dark-content'} />
      <CustomHeader title={'My Review'} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: {
            borderBottomWidth: 2,
            borderColor: AppColor.success,
          },
          tabBarIconStyle: styles.tabBarIcon,
        }}>
        <Tab.Screen
          name="Pending"
          component={Pending}
          options={{
            tabBarLabel: () => (
              <CustomTabBarItem iconName="pending-actions" label="Pending" />
            ),
          }}
        />
        <Tab.Screen
          name="Published"
          component={Published}
          options={{
            tabBarLabel: () => (
              <CustomTabBarItem iconName="publish" label="Published" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MyReview;

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: responsive(18),
    fontFamily: 'NotoSans-Medium',
    color: AppColor.success,
    letterSpacing: responsive(1),
    lineHeight: responsive(25),
  },
  tabBarIcon: {
    backgroundColor: AppColor.borderColor,
    padding: responsive(5),
    height: responsive(40),
    width: responsive(40),
    alignItems: 'center',
    borderRadius: responsive(5),
  },
});
