import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColor} from '../../utils/AppColor';
import LottieView from 'lottie-react-native';
import {responsive} from '../../utils/Responsive';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Success = () => {
  const navigation = useNavigation();
  const handleAction = () => {
    navigation.navigate('BottomNavBar');
  };
  return (
    <View style={styles.main}>
      <View
        style={{
          width: '95%',
          gap: responsive(15),
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../../assets/animation/success.json')}
          autoPlay
          loop
          style={{width: '100%', height: responsive(300)}}
        />
        <Text style={styles.header}>Yah! Your Order Received</Text>
        <Text style={styles.orderNumberText}>Order #XXXXXXXXX</Text>
        <Text style={[styles.orderNumberText, {fontSize: responsive(18)}]}>
          Hello Debjani Sarkar
        </Text>
        <Text style={[styles.orderNumberText, {fontSize: responsive(18)}]}>
          Delivery from Raya’s Kitchen {'\n'}49 Featherstone Street, London,
          EC1Y 8SY, UK
        </Text>
        <Text
          style={[
            styles.orderNumberText,
            {color: AppColor.red, fontSize: responsive(16)},
          ]}>
          Your Order Pickup Date -23 rd Aug, Friday Dinner, pick up from 5:30 pm
        </Text>
        <View style={{width: '90%'}}>
          <CustomButton
            title={'Go Home'}
            color={AppColor.yellow}
            textColor={AppColor.white}
            handleAction={handleAction}
          />
        </View>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontVariant: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(22),
    textAlign: 'center',
  },
  orderNumberText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    textAlign: 'center',
    fontSize: responsive(14),
  },
});
