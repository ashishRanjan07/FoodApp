import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {AppColor} from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../utils/ToastHelper';
import {BallIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {login, saveData} from '../../redux/action/Action';
import CustomTextInputBox from '../../components/CustomTextInputBox';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [password, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [userIdError, setUserIdError] = useState(null);
  const [showPasswordError, setShowPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isLocationAllowed, setIsLocationAllowed] = useState(false);

  useEffect(() => {
    // const response = storage.getBoolean('isLocationAllowed');
    // console.log(response,"Line 47");
    // setIsLocationAllowed()
    if (userId.length > 0) {
      setUserIdError('');
    }
    if (password.length > 0) {
      setShowPasswordError('');
    }
  }, [userId, password]);

  const userIdRegExp = /[A-Z]/;
  const handleLogin = async () => {
    if (userId.length === 0 && password.length === 0) {
      setUserIdError('Please Enter User Id');
      setShowPasswordError('Please Enter Password');
      return;
    }
    if (userId.trim() === '') {
      setUserIdError('Please Enter User Id');
      return;
    }
    if (password.trim() === '') {
      setShowPasswordError('Please Enter Password');
      return;
    }
    const isUserIdValid = userIdRegExp.test(userId.trim());
    if (isUserIdValid) {
      showToast(
        'error',
        'UserId Validation Error',
        'Please use lowercase in UserId',
      );
      return;
    }
    if (password.length < 6) {
      showToast(
        'error',
        'Password Validation Error',
        'Minimum 6 digit password required',
      );
    }
    try {
      setLoading(true);

      if (userId === 'ashish' && password === 'test@123') {
        await AsyncStorage.setItem('isLoggedIn', 'Yes');
        dispatch(login('Yes'));
        dispatch(saveData('Yes'));
        setLoading(false);
        navigation.navigate('App Stack');
      } else {
        setLoading(false);
        setLoginError('Invalid Credentials');
      }
    } catch (error) {
      showToast(
        'info',
        'Try Again',
        'Something went wrong. Please try again...',
      );
    }
    // navigation.navigate('App Stack');
  };

  // const fetchLocation = async () => {
  //   const response = await AsyncStorage.getItem('isLocationAllowed');
  //   console.log(response, 'Line 46');
  // };

  const handleTurnOnLocation = async () => {
    console.log('Clicked on the turn on Location Button');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      console.log(granted, 'Line 116');
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        setIsLocationAllowed(true);
        // storage.set('isLocationAllowed', true)
        // alert("You can use the location");
        // AsyncStorage.setItem('isLocationAllowed', isLocationAllowed);
        setShowModal(!showModal);
      } else {
        console.log('location permission denied');
        // alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <ScrollView style={styles.main}>
        <StatusBar backgroundColor={AppColor.white} barStyle={'dark-content'} />
        <View style={styles.imageHolder}>
          <Image
            source={ImagePath.login1}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.borderOne} />
        <View
          style={[styles.borderOne, {backgroundColor: '#ebf6f0', zIndex: -1}]}
        />
        {/*Form Holder */}
        <KeyboardAvoidingView style={{marginTop: responsive(20)}}>
          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              alignItems: 'center',
              gap: responsive(10),
            }}>
            <CustomTextInputBox
              Icon={Feather}
              IconName={'user'}
              placeholder={'Enter Email/ Mobile'}
              value={userId}
              onChangeText={text => setUserId(text)}
              keyboardType={'default'}
            />
            {userIdError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>{userIdError}</Text>
              </View>
            )}
            <View style={styles.box}>
              <MaterialIcons
                name="lock-outline"
                size={responsive(30)}
                color={AppColor.success}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={AppColor.success}
                value={password}
                onChangeText={text => setUserPassword(text)}
                keyboardType="default"
                style={[styles.textInputStyle, {width: '80%'}]}
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
            {showPasswordError && (
              <View style={styles.errorHolder}>
                <Text style={{color: AppColor.warning}}>
                  {showPasswordError}
                </Text>
              </View>
            )}
            {/* Login Button */}
            <View style={{width: '100%'}}>
              <CustomButton
                title={'Login'}
                color={AppColor.yellow}
                textColor={AppColor.white}
                handleAction={handleLogin}
              />
              {loginError && (
                <View style={styles.errorHolder}>
                  <Text style={{color: AppColor.warning}}>{loginError}</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.textHolder}
              onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.forgetText}>Don't have an account?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.textHolder}
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={styles.forgetText}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {loading && (
        <View style={styles.loaderView}>
          <View style={styles.loaderContainer}>
            <BallIndicator color={AppColor.blue} />
            <Text style={styles.loaderText}>
              Validating your Credentials please wait...
            </Text>
          </View>
        </View>
      )}
      {isLocationAllowed == false && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(!showModal)}>
          <View style={styles.overlay}>
            <View style={styles.alertBox}>
              <Image
                source={ImagePath.location}
                resizeMode="contain"
                style={{width: responsive(150), height: responsive(200)}}
              />
              <Text style={styles.title}>
                To get best offer please turn on location.
              </Text>
              <View style={{width: '85%'}}>
                <CustomButton
                  title={'Turn On'}
                  color={AppColor.yellow}
                  textColor={AppColor.white}
                  handleAction={handleTurnOnLocation}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowModal(!showModal)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <Toast />
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  imageHolder: {
    zIndex: 1,
  },
  imageStyle: {
    height: responsive(500),
    width: '100%',
    borderBottomLeftRadius: responsive(80),
    borderBottomRightRadius: responsive(80),
  },
  borderOne: {
    height: responsive(150),
    marginTop: -100,
    borderRadius: 50,
    backgroundColor: '#edeac8',
    zIndex: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentHolder: {
    borderWidth: 2,
    padding: responsive(10),
    backgroundColor: AppColor.white,
    width: '95%',
    borderRadius: responsive(10),
    elevation: responsive(10),
    borderColor: AppColor.white,
    gap: responsive(10),
  },
  text: {
    fontFamily: 'NotoSans-Bold',
    color: AppColor.black,
    fontSize: responsive(22),
    textAlign: 'center',
    letterSpacing: responsive(1),
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
    width:'96%'
  },
  textInputStyle: {
    width: '90%',
    paddingHorizontal: responsive(10),
    fontFamily: 'NotoSans-Medium',
    color: AppColor.success,
    fontSize: responsive(18),
  },
  forgetText: {
    fontSize: responsive(18),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
    textDecorationLine: 'underline',
  },
  textHolder: {
    alignItems: 'center',
    padding: responsive(5),
    alignSelf: 'center',
  },
  errorHolder: {
    padding: responsive(5),
    width: '95%',
    alignSelf: 'center',
  },
  loaderText: {
    fontSize: responsive(18),
    color: AppColor.blue,
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
  loaderContainer: {
    gap: responsive(30),
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    padding: responsive(15),
    borderRadius: responsive(10),
    borderColor: AppColor.blue,
    backgroundColor: AppColor.white,
    paddingTop: responsive(30),
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: '90%',
    padding: responsive(20),
    backgroundColor: 'white',
    borderRadius: responsive(10),
    alignItems: 'center',
  },
  title: {
    fontSize: responsive(20),
    fontFamily: 'NotoSans-Medium',
    marginBottom: responsive(10),
    color: AppColor.black,
    textAlign: 'center',
  },
  message: {
    color: AppColor.success,
    fontSize: responsive(16),
    marginBottom: responsive(20),
  },
  button: {
    width: '100%',
    padding: responsive(10),
    backgroundColor: AppColor.primary,
    borderRadius: responsive(5),
    alignItems: 'center',
    marginVertical: responsive(5),
  },
  buttonText: {
    color: AppColor.white,
    fontSize: responsive(18),
    fontFamily: 'NotoSans-Medium',
  },
});
