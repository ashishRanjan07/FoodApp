import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../utils/ToastHelper';
import {BallIndicator} from 'react-native-indicators';
import CustomButton from '../../components/CustomButton';
import CustomTextInputBox from '../../components/CustomTextInputBox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {responsive} from '../../utils/Responsive';
const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [userId, setUserId] = useState('');
  const [otpError, setOtpError] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (email.length > 0) {
      setEmailError('');
    }
    if (otp.length > 0) {
      setOtpError('');
    }
    if (newPassword.length > 0) {
      setNewPasswordError('');
    }
    if (confirmNewPassword.length > 0) {
      setConfirmNewPasswordError('');
    }
  }, [email, otp, newPassword, confirmNewPassword]);

  const handleSubmit = async () => {
    if (email.trim() === '') {
      setEmailError('Please Enter valid Email id');
      return;
    }
    const isValidEmail = emailRegExp.test(email.trim());
    if (!isValidEmail) {
      showToast(
        'error',
        'Email Id Validation Error',
        'Please enter the valid Email Id',
      );
      return;
    }
    try {
      setLoading(true);
      const data = {
        user_email: email,
      };
      const response = await forgetPassword_Email(data);
      console.log(response, 'Line 70');
      if (response?.status_code === 200) {
        console.log(response?.email_otp, 'Line 71');
        setOtpValue(response?.email_otp);
        setUserId(response?.data?.ID);
        setStep(2);
        setLoading(false);
        showToast(
          'success',
          'OTP is send',
          'OTP is sent on the provide email address',
        );
      }
      if (response?.status_code === 404) {
        setEmailError(response?.message);
        setEmail('');
        setLoading(false);
      }
    } catch (error) {
      showToast(
        'error',
        'Something Went Wrong',
        'Please try again after sometimes.',
      );
    }
  };

  const handleVerifyOtp = () => {
    if (otp.trim() === '') {
      setOtpError('Please enter Otp');
      return;
    }
    if (otp.length < 4) {
      showToast(
        'error',
        'OTP Validation',
        'Please Enter valid 4 digit Otp code.',
      );
      return;
    }
    setLoading(true);
    if (otp == otpValue) {
      setStep(3);
      console.log(otp, otpValue, 'Line 109');
      setLoading(false);
    } else {
      setOtpError('Please enter valid OTP');
      setOtp('');
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword.trim() === '' && confirmNewPassword.trim() === '') {
      setNewPasswordError('New Password is required.');
      setConfirmNewPasswordError('Confirm Password is required.');
      return;
    }
    if (newPassword.trim() === '') {
      setNewPasswordError('New Password is required.');
      return;
    }
    if (confirmNewPassword.trim() === '') {
      setConfirmNewPasswordError('Confirm Password is required.');
      return;
    }
    if (confirmNewPassword.length < 6) {
      showToast(
        'error',
        'Password Validation',
        'Password must be greater than 6 digit',
      );
      return;
    }
    if (newPassword.trim() !== confirmNewPassword.trim()) {
      setConfirmNewPasswordError('Passwords do not match.');
      showToast(
        'error',
        'Password Mismatch',
        'New Password and Confirm New Password do not match.',
      );
      return;
    }
    try {
      setLoading(true);
      const data = {
        id: userId,
        password: confirmNewPassword,
      };
      const response = await change_password(data);
      console.log(response);
      if (response?.status_code === 200) {
        showToast(
          'success',
          'Password Changed',
          'Your password is changed successfully.',
        );
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        setStep(1);
        setLoading(false);
        navigation.navigate('Login');
      } else {
        showToast(
          'error',
          'something went wrong2',
          'Please again after sometime2.',
        );
        setLoading(false);
      }
    } catch (error) {
      showToast(
        'error',
        'something went wrong',
        'Please again after sometime.',
      );
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <ImageBackground
        source={ImagePath.welcome}
        resizeMode="cover"
        style={styles.container}>
        <View
          style={{
            backgroundColor: AppColor.white,
            width: '95%',
            alignItems: 'center',
            padding: responsive(20),
            borderRadius: responsive(10),
            elevation: responsive(10),
          }}>
          <View style={styles.formHolder}>
            {step === 1 && (
              <>
                <CustomTextInputBox
                  Icon={MaterialIcons}
                  IconName={'email'}
                  placeholder={'User Id'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                  keyboardType={'email-address'}
                />
                {emailError && (
                  <View style={styles.errorHolder}>
                    <Text style={{color: AppColor.warning}}>{emailError}</Text>
                  </View>
                )}
                <CustomButton
                  title={'Submit'}
                  color={AppColor.primary}
                  handleAction={handleSubmit}
                  textColor={AppColor.white}
                />
              </>
            )}
            {step === 2 && (
              <>
                <CustomTextInputBox
                  Icon={MaterialIcons}
                  IconName={'password'}
                  placeholder={'OTP'}
                  value={otp}
                  onChangeText={text => setOtp(text)}
                  keyboardType={'number-pad'}
                  maxLength={4}
                />
                {otpError && (
                  <View style={styles.errorHolder}>
                    <Text style={{color: AppColor.warning}}>{otpError}</Text>
                  </View>
                )}
                <CustomButton
                  title={'Verify OTP'}
                  color={AppColor.primary}
                  textColor={AppColor.white}
                  handleAction={handleVerifyOtp}
                />
              </>
            )}
            {step === 3 && (
              <>
                <CustomTextInputBox
                  Icon={MaterialIcons}
                  IconName={'lock-outline'}
                  placeholder={'New Password*'}
                  value={newPassword}
                  onChangeText={text => setNewPassword(text)}
                  keyboardType={'default'}
                />
                {newPasswordError && (
                  <View style={styles.errorHolder}>
                    <Text style={{color: AppColor.warning}}>
                      {newPasswordError}
                    </Text>
                  </View>
                )}
                <CustomTextInputBox
                  Icon={MaterialIcons}
                  IconName={'lock-outline'}
                  placeholder={'Confirm New Password*'}
                  value={confirmNewPassword}
                  onChangeText={text => setConfirmNewPassword(text)}
                  keyboardType={'default'}
                />
                {confirmNewPasswordError && (
                  <View style={styles.errorHolder}>
                    <Text style={{color: AppColor.warning}}>
                      {confirmNewPasswordError}
                    </Text>
                  </View>
                )}
                <CustomButton
                  title={'Update Password'}
                  color={AppColor.primary}
                  handleAction={handleUpdatePassword}
                  textColor={AppColor.white}
                />
              </>
            )}
          </View>

          {/* Back to login */}
          <TouchableOpacity
            style={styles.newUserHolder}
            onPress={handleBackToLogin}>
            <Text style={styles.label}>Back to Login</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <View style={styles.loaderView}>
            <View style={styles.loaderContainer}>
              <BallIndicator color={AppColor.blue} />
              <Text style={styles.loaderText}>
                Validating your input please wait...
              </Text>
            </View>
          </View>
        )}
        <Toast />
      </ImageBackground>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageStyle: {
    width: '75%',
    height: responsive(150),
  },
  formHolder: {
    width: '95%',
    gap: responsive(10),
  },
  errorHolder: {
    padding: responsive(5),
    width: '95%',
    alignSelf: 'center',
  },
  newUserHolder: {
    padding: responsive(10),
    alignItems: 'center',
  },
  label: {
    fontSize: responsive(18),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
  },
  loaderContainer: {
    gap: responsive(30),
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    padding: responsive(15),
    borderRadius: responsive(10),
    borderColor: AppColor.primary,
    backgroundColor: AppColor.white,
    paddingTop: responsive(30),
  },
  loaderText: {
    fontSize: responsive(18),
    color: AppColor.primary,
    textAlign: 'center',
  },
  loaderView: {
    position: 'absolute',
    borderWidth: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: responsive(10),
  },
});
