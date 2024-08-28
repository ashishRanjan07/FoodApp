import {Image, StyleSheet, Text, View, Linking, StatusBar} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {ImagePath} from './ImagePath';
import {AppColor} from './AppColor';
import {responsive} from './Responsive';

const NoInternet = () => {
  const handleOpenSetting = async () => {
    console.log('Open Settings');
    await Linking.openSettings();
  };
  return (
    <View style={styles.contentHolder}>
      <StatusBar backgroundColor={AppColor.white} barStyle={'dark-content'} />
      <Image
        source={ImagePath.noInternet}
        resizeMode="cover"
        style={styles.imageStyle}
      />
      <Text style={styles.text}>
        Please check your internet connection again or connect to wifi
      </Text>
      <View style={styles.buttonHolder}>
        <CustomButton
          title={'Open Setting'}
          color={AppColor.primary}
          handleAction={handleOpenSetting}
          textColor={AppColor.white}
        />
      </View>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  contentHolder: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColor.white,
    justifyContent: 'center',
  },
  imageStyle: {
    height: responsive(350),
    width: responsive(350),
  },
  text: {
    width: '85%',
    textAlign: 'center',
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
    color: AppColor.black,
    letterSpacing: responsive(1),
  },
  buttonHolder: {
    marginVertical: responsive(20),
    width: '90%',
  },
});
