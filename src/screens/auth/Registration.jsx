import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import CustomTextInputBox from '../../components/CustomTextInputBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {showToast} from '../../utils/ToastHelper';

const Registration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [pinCodeError, setPinCodeError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    if (name.length > 0) {
      setNameError(null);
    }
    if (email.length > 0) {
      setEmailError(null);
    }
    if (mobile.length > 0) {
      setMobileError(null);
    }
    if (pinCode.length > 0) {
      setPinCodeError(null);
    }
    if (password.length > 0) {
      setPasswordError(null);
    }
    if (confirmPassword.length > 0) {
      setConfirmPasswordError(null);
    }
  }, [name, email, mobile, pinCode, password, confirmPassword]);

  const handleSignUp = () => {
    console.log('button Pressed');
    if (name.trim() === '') {
      setNameError('Please enter name');
      return;
    }
    if (email.trim() === '') {
      setEmailError('Please enter email id');
      return;
    }
    if (mobile.trim() === '') {
      setMobileError('Please enter mobile number');
      return;
    }
    if (pinCode.trim() === '') {
      setPinCodeError('Please enter pin code');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Please enter password');
      return;
    }
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please enter confirm password');
      return;
    }
    if (password.length < 6) {
      showToast(
        'error',
        'Week password',
        'password Must be the length of 6 and greater',
      );
    }
    if (password != confirmPassword) {
      showToast(
        'error',
        'Password Mis-Match',
        'Password and Confirm Password must be same',
      );
    }
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.firstImageHolder}>
          <Image
            source={ImagePath.registration1}
            resizeMode="stretch"
            style={styles.firstImageStyle}
          />
        </View>
        <View style={styles.secondImageHolder}>
          <Image
            source={ImagePath.registration2}
            resizeMode="cover"
            style={styles.secondImageStyle}
          />
        </View>
        <ScrollView style={styles.formHolder}>
          <View style={styles.formItemHolder}>
            <CustomTextInputBox
              Icon={AntDesign}
              IconName={'idcard'}
              placeholder={'Enter Full Name'}
              value={name}
              onChangeText={text => setName(text)}
              keyboardType={'default'}
            />
            {nameError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>{nameError}</Text>
              </View>
            )}
            <CustomTextInputBox
              Icon={Feather}
              IconName={'mail'}
              placeholder={'Enter Email Id'}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType={'email'}
            />
            {emailError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>{emailError}</Text>
              </View>
            )}
            <CustomTextInputBox
              Icon={Feather}
              IconName={'phone-call'}
              placeholder={'Enter Mobile Name'}
              value={mobile}
              onChangeText={text => setMobile(text)}
              keyboardType={'number-pad'}
              maxLength={10}
            />
            {mobileError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>{mobileError}</Text>
              </View>
            )}
            <CustomTextInputBox
              Icon={MaterialIcons}
              IconName={'location-pin'}
              placeholder={'Enter Pin Code'}
              value={pinCode}
              onChangeText={text => setPinCode(text)}
              keyboardType={'number-pad'}
              maxLength={6}
            />
            {pinCodeError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>{pinCodeError}</Text>
              </View>
            )}
            <CustomTextInputBox
              Icon={MaterialIcons}
              IconName={'password'}
              placeholder={'Enter Password'}
              value={password}
              onChangeText={text => setPassword(text)}
              keyboardType={'default'}
              secureText={true}
            />
            {passwordError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>{passwordError}</Text>
              </View>
            )}
            <View style={styles.box}>
              <MaterialIcons
                name="lock-outline"
                size={responsive(30)}
                color={AppColor.success}
                style={{paddingHorizontal: responsive(5)}}
              />
              <TextInput
                placeholder="Enter Confirm Password"
                placeholderTextColor={AppColor.success}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                keyboardType="default"
                style={[styles.textInputStyle, {width: '75%'}]}
                secureTextEntry={showPassword}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                }}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={responsive(30)}
                  color={AppColor.success}
                />
              </TouchableOpacity>
            </View>
            {confirmPasswordError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>
                  {confirmPasswordError}
                </Text>
              </View>
            )}
            <CustomButton
              title={'Sign Up'}
              color={AppColor.yellow}
              textColor={AppColor.white}
              handleAction={handleSignUp}
            />
            <TouchableOpacity
              style={styles.textHolder}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.forgetText}>
                Are you existing User? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.thirdImageHolder}>
          <Image
            source={ImagePath.registration3}
            resizeMode="cover"
            style={styles.thirdImageStyle}
          />
        </View>
      </View>
      <Toast />
    </>
  );
};

export default Registration;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  firstImageHolder: {
    position: 'absolute',
    width: '45%',
    height: '20%',
    overflow: 'hidden',
    borderBottomLeftRadius: responsive(100),
    borderBottomRightRadius: responsive(100),
    borderTopRightRadius: responsive(100),
    zIndex: 1,
  },
  firstImageStyle: {
    width: '100%',
    height: '100%',
  },
  secondImageHolder: {
    overflow: 'hidden',
    position: 'absolute',
    width: '75%',
    height: '30%',
    right: 0,
    borderBottomLeftRadius: responsive(150),
  },
  secondImageStyle: {
    width: '145%',
    height: '100%',
  },
  thirdImageHolder: {
    position: 'absolute',
    bottom: -25,
    borderColor: AppColor.primary,
    right: -75,
    width: '80%',
    height: '35%',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: responsive(200),
    opacity: 0.4,
  },
  thirdImageStyle: {
    width: '100%',
    height: '100%',
  },
  formHolder: {
    zIndex: 1,
    flex: 1,
  },
  formItemHolder: {
    marginTop: '50%',
    width: '80%',
    alignSelf: 'center',
    gap: responsive(10),
  },
  errorHolder: {
    padding: responsive(5),
    width: '95%',
    alignSelf: 'center',
  },
  box: {
    borderWidth: 2,
    padding: responsive(5),
    borderRadius: responsive(5),
    borderColor: '#AFE1AF',
    flexDirection: 'row',
    gap: responsive(5),
    alignItems: 'center',
    backgroundColor: '#AFE1AF',
  },
  textInputStyle: {
    width: '90%',
    paddingHorizontal: responsive(10),
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
  },
  forgetText: {
    fontSize: responsive(20),
    color: AppColor.success,
    fontFamily: 'NotoSans-Bold',
    textDecorationLine: 'underline',
  },
  textHolder: {
    alignItems: 'center',
    padding: responsive(5),
    alignSelf: 'center',
  },
});
