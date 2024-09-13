import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pending from './Pending';
import Published from './Published';
import CustomHeader from '../../components/CustomHeader';
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Tab = createMaterialTopTabNavigator();
import Data from '../../assets/json/Review.json';

const MyReview = () => {
  const [data, setData] = useState(Data);
  const [loading, setLoading] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [publishedData, setPublishedData] = useState();

  useEffect(() => {
    separateReview();
  }, []);

  const separateReview = async () => {
    try {
      const filteredData = data.filter(item => item.status === 'Pending');
      setPendingData(filteredData);
      console.log(filteredData, 'line 27');
      const publishedFilteredData = data.filter(
        item => item.status === 'Published',
      );
      setPublishedData(publishedFilteredData);
    } catch (error) {
      console.log('Error separating review data:', error);
    }
  };

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
      {pendingData && publishedData ? (
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
            initialParams={{reviewData: pendingData}}
            options={{
              tabBarLabel: () => (
                <CustomTabBarItem iconName="pending-actions" label="Pending" />
              ),
            }}
          />
          <Tab.Screen
            name="Published"
            component={Published}
            initialParams={{reviewData:publishedData}}
            options={{
              tabBarLabel: () => (
                <CustomTabBarItem iconName="publish" label="Published" />
              ),
            }}
          />
        </Tab.Navigator>
      ) : null}
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
