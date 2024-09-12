import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomListHolder from '../../components/CustomListHolder';
import DeviceInfo from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomBottomModel from '../../components/CustomBottomModel';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {login, saveData} from '../../redux/action/Action';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notificationModalShow, setShowNotificationModal] = useState(false);
  const [isNotificationEnable, setIsNotificationEnabled] = useState(true);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAboutUsModal, setShowAboutUsModal] = useState(false);

  const handleHideLogout = async () => {
    // console.log('Clicked on the Logout button');
    setShowLogoutModal(!showLogoutModal);
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    dispatch(login('No'));
    dispatch(saveData('No'));
    handleHideLogout();
  };

  const handleShowNotificationModal = () => {
    console.log(notificationModalShow, 'Line 67');
    setShowNotificationModal(!notificationModalShow);
  };

  const handlePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy);
  };

  const handleAboutUs = () => {
    setShowAboutUsModal(!showAboutUsModal);
  };

  return (
    <View style={styles.main}>
      {/* Upper Header Section */}
      <View style={styles.upperProfileHolderSection}>
        <Image
          source={ImagePath.logo}
          resizeMode="cover"
          style={{
            height: responsive(150),
            width: responsive(150),
            borderRadius: responsive(75),
          }}
        />
        <Text style={styles.userIdText}>aviashishranjan@gmail.com</Text>
        <Text style={styles.userIdText}>+91 6206416452</Text>
      </View>
      <ScrollView>
        {/*Account Setting*/}
        <View style={styles.accountSettingHolder}>
          <View style={styles.headerTextHolder}>
            <Text style={styles.headerText}>Account Setting</Text>
          </View>
          <CustomListHolder
            Icon={MaterialCommunityIcons}
            IconName={'account-edit'}
            title={'Edit Account'}
            handleAction={() =>
              console.log('Clicked on the Edit Profile Options')
            }
          />
          <CustomListHolder
            Icon={MaterialIcons}
            IconName={'history'}
            title={'My Order'}
            handleAction={() => console.log('Clicked on the My Order Options')}
          />
          <CustomListHolder
            Icon={MaterialIcons}
            IconName={'payments'}
            title={'Payment Information'}
            handleAction={() =>
              console.log('Clicked on the Payment Information Options')
            }
          />
          <CustomListHolder
            Icon={MaterialIcons}
            IconName={'reviews'}
            title={'My Review'}
            handleAction={() => navigation.navigate('My Review')}
          />
        </View>

        {/* General Setting */}
        <View style={styles.accountSettingHolder}>
          <View style={styles.headerTextHolder}>
            <Text style={styles.headerText}>General Setting</Text>
          </View>
          <CustomListHolder
            Icon={Feather}
            IconName={'anchor'}
            title={'About Us'}
            handleAction={handleAboutUs}
          />
          <CustomListHolder
            Icon={Feather}
            IconName={'info'}
            title={'Privacy Policy'}
            handleAction={handlePrivacyPolicy}
          />
          <CustomListHolder
            Icon={Feather}
            IconName={'bell'}
            title={'Notification'}
            handleAction={() =>
              setShowNotificationModal(!notificationModalShow)
            }
          />
          <CustomListHolder
            Icon={Feather}
            IconName={'log-out'}
            title={'Logout'}
            handleAction={handleHideLogout}
          />
        </View>
        <Text style={styles.versionText}>V.{DeviceInfo.getVersion()}</Text>
      </ScrollView>
      {/* Logout Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showLogoutModal}
        statusBarTranslucent
        onRequestClose={handleHideLogout}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, {flex: 0}]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleHideLogout}>
              <Feather name="x" size={responsive(25)} color={AppColor.black} />
            </TouchableOpacity>
            <Text style={styles.messageText}>Are you sure want to logout?</Text>
            <CustomButton
              title={'Yes'}
              color={AppColor.red}
              textColor={AppColor.white}
              handleAction={handleLogout}
            />
            <CustomButton
              title={'No'}
              color={AppColor.yellow}
              textColor={AppColor.white}
              handleAction={handleHideLogout}
            />
          </View>
        </View>
      </Modal>
      {/* Modal for the Notifications */}
      <CustomBottomModel
        visible={notificationModalShow}
        onClose={handleShowNotificationModal}
        onConfirm={handleShowNotificationModal}
        message={'Change Notification Settings'}
        iconName={'notifications'}
        name={'Notification'}
        isEnabled={isNotificationEnable}
        isEnabledValued={'Yes'}
        isNotEnabledValue={'No'}
        handleEnable={value => setIsNotificationEnabled(value)}
      />
      {/* Modal for the Privacy Policy */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showPrivacyPolicy}
        statusBarTranslucent
        onRequestClose={handlePrivacyPolicy}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handlePrivacyPolicy}>
              <Feather name="x" size={responsive(25)} color={AppColor.black} />
            </TouchableOpacity>
            {isLoading && (
              <View style={styles.loaderView}>
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size={'large'} color={AppColor.yellow} />
                  <Text style={styles.loaderText}>Please wait...</Text>
                </View>
              </View>
            )}
            <WebView
              source={{uri: 'https://www.velocis.in/terms-of-service'}}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              style={isLoading ? {display: 'none'} : {flex: 1}}
            />
          </View>
        </View>
      </Modal>
      {/* Modal for the About us */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showAboutUsModal}
        statusBarTranslucent
        onRequestClose={handleAboutUs}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleAboutUs}>
              <Feather name="x" size={responsive(25)} color={AppColor.black} />
            </TouchableOpacity>
            {isLoading && (
              <View style={styles.loaderView}>
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size={'large'} color={AppColor.yellow} />
                  <Text style={styles.loaderText}>Please wait...</Text>
                </View>
              </View>
            )}
            <WebView
              source={{uri: 'https://www.velocis.in/about'}}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              style={isLoading ? {display: 'none'} : {flex: 1}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  upperProfileHolderSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '35%',
    backgroundColor: AppColor.yellow,
    gap: responsive(5),
  },
  userIdText: {
    fontSize: responsive(18),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
    textAlign: 'center',
  },
  accountSettingHolder: {
    marginVertical: responsive(10),
    width: '95%',
    alignSelf: 'center',
    gap: responsive(5),
    // borderWidth: 2,
    backgroundColor: '#F6F5F2',
  },
  headerTextHolder: {
    backgroundColor: AppColor.white,
    borderLeftWidth: 5,
    borderLeftColor: AppColor.success,
    padding: responsive(10),
  },
  headerText: {
    fontSize: responsive(18),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
  },
  listHolder: {
    flexDirection: 'row',
    padding: responsive(10),
    gap: responsive(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: AppColor.yellow,
    borderBottomWidth: 2,
  },
  listText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
    width: '75%',
  },
  versionText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: AppColor.white,
    padding: responsive(20),
    borderTopLeftRadius: responsive(20),
    borderTopRightRadius: responsive(20),
    gap: responsive(10),
    flex: 0.6,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  messageText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(20),
    color: AppColor.warning,
    textAlign: 'center',
  },
  loaderContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: AppColor.white,
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  loaderView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
  },
});
