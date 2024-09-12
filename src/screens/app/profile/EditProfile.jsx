import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppColor} from '../../../utils/AppColor';
import CustomHeader from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {responsive} from '../../../utils/Responsive';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../../../components/CustomButton';

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(null);
  const [pinCode, setPinCode] = useState('');
  const [pinCodeError, setPinCodeError] = useState(null);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(null);

  const handleUpdateInfo = async () => {
    console.log(name, email, mobile, pinCode, address, 'Line 33');
  };
  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <CustomHeader title={'Edit Profile'} />
      <ScrollView style={styles.main}>
        <View
          style={{
            marginTop: responsive(40),
            gap: responsive(10),
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.inputBoxHolder}>
            <Text style={styles.labelText}>Name</Text>
            <View style={styles.input}>
              <Feather
                name="user"
                size={responsive(30)}
                color={AppColor.primary}
              />
              <TextInput
                placeholder="Name"
                value={name}
                keyboardType="default"
                placeholderTextColor={AppColor.black}
                onChangeText={text => setName(text)}
                style={styles.input2}
              />
            </View>
          </View>

          <View style={styles.inputBoxHolder}>
            <Text style={styles.labelText}>Email</Text>
            <View style={styles.input}>
              <Feather
                name="mail"
                size={responsive(30)}
                color={AppColor.primary}
              />
              <TextInput
                placeholder="Email"
                value={email}
                keyboardType="default"
                placeholderTextColor={AppColor.black}
                onChangeText={text => setEmail(text)}
                style={styles.input2}
              />
            </View>
          </View>
          <View style={styles.inputBoxHolder}>
            <Text style={styles.labelText}>Mobile Number</Text>
            <View style={styles.input}>
              <Octicons
                name="device-mobile"
                size={responsive(30)}
                color={AppColor.primary}
              />
              <TextInput
                placeholder="Mobile Number"
                value={mobile}
                keyboardType="default"
                placeholderTextColor={AppColor.black}
                onChangeText={text => setMobile(text)}
                style={styles.input2}
              />
            </View>
          </View>
          <View style={styles.inputBoxHolder}>
            <Text style={styles.labelText}>Pin Code</Text>
            <View style={styles.input}>
              <Feather
                name="map-pin"
                size={responsive(30)}
                color={AppColor.primary}
              />
              <TextInput
                placeholder="Pin Code"
                value={pinCode}
                keyboardType="default"
                placeholderTextColor={AppColor.black}
                onChangeText={text => setPinCode(text)}
                style={styles.input2}
              />
            </View>
          </View>
          <View style={styles.inputBoxHolder}>
            <Text style={styles.labelText}>Address</Text>
            <View style={styles.input}>
              <Entypo
                name="address"
                size={responsive(30)}
                color={AppColor.primary}
              />
              <TextInput
                placeholder="Address"
                value={address}
                keyboardType="default"
                placeholderTextColor={AppColor.black}
                onChangeText={text => setAddress(text)}
                style={styles.input2}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            marginVertical: responsive(20),
            alignSelf: 'center',
          }}>
          <CustomButton
            title={'Update Info'}
            color={AppColor.yellow}
            textColor={AppColor.white}
            handleAction={handleUpdateInfo}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  inputBoxHolder: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: AppColor.white,
    gap: responsive(5),
    borderWidth: 2,
    borderColor: AppColor.light,
    padding: responsive(10),
    borderRadius: responsive(10),
    elevation: responsive(10),
  },
  labelText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(20),
    color: AppColor.black,
    textAlign: 'left',
  },
  input: {
    backgroundColor: AppColor.light,
    borderRadius: responsive(10),
    paddingHorizontal: responsive(10),
    width: '100%',
    flexDirection: 'row',
    gap: responsive(10),
    alignItems: 'center',
  },
  input2: {
    fontFamily: 'NotoSans-Regular',
    fontSize: responsive(18),
    width: '90%',
    paddingHorizontal: responsive(10),
    color: AppColor.black,
  },
});
