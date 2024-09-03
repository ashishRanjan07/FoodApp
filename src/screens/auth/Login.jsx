import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
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
import { login, saveData } from '../../redux/action/Action';


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
  const positionAnim = useRef(new Animated.ValueXY({x: 0, y: -250})).current;

  useEffect(() => {
    Animated.timing(positionAnim, {
      toValue: {x: 0, y: 0},
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
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
     
      if (userId==='ashish' && password==='test@123') {
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

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <ImageBackground
        source={ImagePath.welcome}
        resizeMode="cover"
        style={styles.container}>
        <Animated.View
          style={[
            styles.contentHolder,
            {transform: positionAnim.getTranslateTransform()},
          ]}>
          <Text style={styles.text}>Login</Text>
          {/* Email id */}
          <View style={styles.box}>
            <Feather
              name="user"
              size={responsive(30)}
              color={AppColor.success}
            />
            <TextInput
              placeholder="Users Id"
              placeholderTextColor={AppColor.black}
              value={userId}
              onChangeText={text => setUserId(text)}
              keyboardType="default"
              style={styles.textInputStyle}
            />
          </View>
          {userIdError && (
            <View style={styles.errorHolder}>
              <Text style={{color: AppColor.warning}}>{userIdError}</Text>
            </View>
          )}
          {/* Password */}
          <View style={styles.box}>
            <MaterialIcons
              name="lock-outline"
              size={responsive(30)}
              color={AppColor.success}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={AppColor.black}
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
              <Text style={{color: AppColor.warning}}>{showPasswordError}</Text>
            </View>
          )}
          {/* Login Button */}
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
          <TouchableOpacity style={styles.textHolder}>
            <Text style={styles.forgetText}>Forget Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textHolder}
            onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.forgetText}>Don't have an account?</Text>
          </TouchableOpacity>
        </Animated.View>
        <Toast />
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
      </ImageBackground>
    </View>
  );
};

export default Login;

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
    padding: responsive(10),
    borderRadius: responsive(5),
    borderColor: AppColor.success,
    flexDirection: 'row',
    gap: responsive(5),
    alignItems: 'center',
  },
  textInputStyle: {
    width: '90%',
    paddingHorizontal: responsive(10),
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
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
});
