import React, {useEffect, useRef} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {AppColor} from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import CustomButton from '../../components/CustomButton';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  const positionAnim = useRef(new Animated.ValueXY({x: 0, y: 250})).current;

  useEffect(() => {
    Animated.timing(positionAnim, {
      toValue: {x: 0, y: 0},
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <ImageBackground
        source={ImagePath.welcome}
        resizeMode="cover"
        style={styles.main}>
        <Animated.View
          style={[
            styles.contentHolder,
            {
              transform: positionAnim.getTranslateTransform(),
            },
          ]}>
          <View style={styles.contentView}>
            <Text style={styles.text}>My Home Kitchen</Text>
            <Text style={styles.subHeading}>
              "A Heritage of Flavors." "Elegance on Every Plate."
            </Text>
            <View style={styles.buttonHolder}>
              <CustomButton
                title={'Registration'}
                color={AppColor.blue}
                textColor={AppColor.white}
                handleAction={() =>
                  navigation.navigate('Registration')
                }
              />
              <CustomButton
                title={'Login'}
                color={AppColor.red}
                textColor={AppColor.white}
                handleAction={() => navigation.navigate('Login')}
              />
            </View>
          </View>
        </Animated.View>
        <View style={styles.versionHolder}>
          <Text style={styles.versionText}>
            V.{DeviceInfo.getVersion()}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  contentHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentView: {
    borderWidth: 2,
    backgroundColor: AppColor.white,
    width: '90%',
    padding: responsive(10),
    borderRadius: responsive(10),
    borderColor: AppColor.white,
    elevation: responsive(50),
    alignItems: 'center',
    gap: responsive(5),
  },
  text: {
    fontFamily: 'NotoSans-Bold',
    color: AppColor.black,
    fontSize: responsive(22),
    textAlign: 'center',
    letterSpacing: responsive(1),
  },
  subHeading: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.borderColor,
    fontSize: responsive(15),
    textAlign:'center'
  },
  buttonHolder: {
    width: '90%',
    gap: responsive(15),
    marginVertical: responsive(10),
  },
  versionText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
    textAlign: 'center',
  },
  versionHolder: {
    position: 'absolute',
    top: 10,
    right: 25,
  },
});

export default Welcome;
