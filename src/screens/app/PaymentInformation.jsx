import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppColor} from '../../utils/AppColor';
import GiftCard from '../../components/profile/GiftCard';
import CardInfo from '../../components/profile/CardInfo';
import SavedUPIInfo from '../../components/profile/SavedUPIInfo';
import {responsive} from '../../utils/Responsive';
import CustomHeader from '../../components/CustomHeader';

const PaymentInformation = () => {
  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: AppColor.yellow}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <CustomHeader title={'Payment Information'} />
      <ScrollView style={styles.main}>
        <View style={styles.contentHolder}>
          <GiftCard />
          <CardInfo />
          <SavedUPIInfo />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentInformation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  contentHolder: {
    marginVertical: responsive(10),
    padding: responsive(10),
    width: '100%',
    alignSelf: 'center',
    gap: responsive(20),
  },
});
