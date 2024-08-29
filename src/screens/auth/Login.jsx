import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import React, {useState,useRef, useEffect} from 'react';
import {AppColor} from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation =useNavigation();
  const [userId, setUserId] = useState('');
  const [password, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const positionAnim = useRef(new Animated.ValueXY({x: 0, y: -250})).current;

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
        style={styles.container}>
        <Animated.View style={[styles.contentHolder,{transform:positionAnim.getTranslateTransform()}]}>
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
          {/* Login Button */}
          <CustomButton
            title={'Login'}
            color={AppColor.yellow}
            textColor={AppColor.white}
            handleAction={() => navigation.navigate("App Stack")}
          />
          <TouchableOpacity style={styles.textHolder}>
            <Text style={styles.forgetText}>Forget Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.textHolder} onPress={()=> navigation.navigate("Registration")}>
            <Text style={styles.forgetText}>Don't have an account?</Text>
          </TouchableOpacity>
        </Animated.View>
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
});
