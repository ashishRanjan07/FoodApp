import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';
import {ImagePath} from '../../utils/ImagePath';
import CustomButton from '../../components/CustomButton';

const LandingPage = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Registration');
  }
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={AppColor.white} barStyle={'dark-content'} />
      <View style={styles.imageHolder}>
        <Image
          source={ImagePath.landing}
          resizeMode="cover"
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.lowerViewHolder}>
        <Text style={styles.title}>My Home Kitchen</Text>
        <Text style={styles.secondText}>Let's Begin the journey of test</Text>
      </View>
      <View style={styles.buttonHolder}>
        <CustomButton
          title={'Get Started'}
          color={AppColor.yellow}
          textColor={AppColor.white}
          handleAction={handleGetStarted}
        />
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  imageHolder: {
    height: '65%',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: responsive(80),
    borderBottomRightRadius: responsive(80),
  },
  lowerViewHolder: {
    height: '35%',
    paddingVertical: responsive(80),
    borderColor: AppColor.red,
    alignItems: 'center',
    gap: responsive(5),
  },
  title: {
    fontFamily: 'NotoSans-Bold',
    color: AppColor.success,
    fontSize: responsive(30),
    fontStyle: 'normal',
    textAlign: 'center',
  },
  secondText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
    color: AppColor.borderColor,
    textAlign: 'center',
  },
  buttonHolder: {
    position: 'absolute',
    width: '80%',
    alignSelf: 'center',
    bottom: 25,
  },
});
