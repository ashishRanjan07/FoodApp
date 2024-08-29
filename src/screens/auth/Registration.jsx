import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import CustomTextInputBox from '../../components/CustomTextInputBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Registration = () => {
    const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <ImageBackground
        source={ImagePath.welcome}
        resizeMode="cover"
        style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.contentHolder}>
            <Text style={styles.text}>Registration</Text>
            <CustomTextInputBox
              Icon={AntDesign}
              IconName={'idcard'}
              placeholder={'Enter Full Name'}
              value={name}
              onChangeText={text => setName(text)}
              keyboardType={'default'}
            />
            <CustomTextInputBox
              Icon={Feather}
              IconName={'mail'}
              placeholder={'Enter Email Id'}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType={'email'}
            />
            <CustomTextInputBox
              Icon={Feather}
              IconName={'phone-call'}
              placeholder={'Enter Mobile Name'}
              value={mobile}
              onChangeText={text => setMobile(text)}
              keyboardType={'number-pad'}
              maxLength={10}
            />
            <CustomTextInputBox
              Icon={MaterialIcons}
              IconName={'location-pin'}
              placeholder={'Enter Pin Code'}
              value={pinCode}
              onChangeText={text => setPinCode(text)}
              keyboardType={'number-pad'}
              maxLength={6}
            />
            <CustomTextInputBox
              Icon={MaterialIcons}
              IconName={'password'}
              placeholder={'Enter Password'}
              value={password}
              onChangeText={text => setPassword(text)}
              keyboardType={'default'}
              secureText={true}
            />
            <View style={styles.box}>
              <MaterialIcons
                name="lock-outline"
                size={responsive(30)}
                color={AppColor.success}
              />
              <TextInput
                placeholder="Enter Confirm Password"
                placeholderTextColor={AppColor.black}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
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
            <CustomButton
              title={'Registration'}
              color={AppColor.yellow}
              textColor={AppColor.white}
              handleAction={() =>navigation.navigate('Login')}
            />

            <TouchableOpacity style={styles.textHolder} onPress={()=> navigation.navigate('Login')}>
              <Text style={styles.forgetText}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Registration;

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
    alignSelf: 'center',
    marginTop: responsive(50),
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
