import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppColor} from '../../../utils/AppColor';
import CustomHeader from '../../../components/CustomHeader';
import UpperHeader from '../../../components/Home/UpperHeader';
import {responsive} from '../../../utils/Responsive';
import HomeSearch from '../../../components/Home/HomeSearch';
import Data from '../../../assets/json/WeekendPartyRestaurantList.json';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../../components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';

const WeekendPartyRestaurantList = ({route}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [contactDetails, setShowContactDetails] = useState();

  const {item} = route.params;

  const staticImageUrl = 'https://picsum.photos/300';

  const handleShowMenu = item => {
    // console.log(item);
    setShowMenuItem(true);
    setSelectedDetails(item?.id);
  };

  const handleContactDetails = item => {
    // console.log(item, 'Line 38');
    setShowModal(true);
    setShowContactDetails(item);
  };

  const renderItem2 = ({item}) => {
    // console.log(item, 'Line 38');
    return (
      <View style={styles.renderItem2}>
        <Text style={styles.nameText}>{item?.itemName}</Text>
        <Text style={styles.nameText}> - Rs.{item?.price}</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.renderItem}>
        <View style={styles.itemHolder}>
          <View style={styles.imageHolder}>
            <Image
              source={{uri: item?.imageLink}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>

          <View style={styles.detailsHolder}>
            <Text style={styles.nameText}>{item?.name}</Text>
            <Text numberOfLines={3} style={styles.descriptionText}>
              {item?.description}
            </Text>
            {setShowMenuItem && selectedDetails === item.id && (
              <FlatList
                data={item?.menuItemList}
                renderItem={renderItem2}
                keyExtractor={(item, index) => index}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.iconHolder}
            onPress={() => handleShowMenu(item)}>
            <Entypo
              name="dots-three-vertical"
              size={responsive(30)}
              color={AppColor.black}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonHolder}>
          <CustomButton
            title={'Contact Now'}
            color={AppColor.yellow}
            textColor={AppColor.white}
            handleAction={() => handleContactDetails(item?.contactDetails)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <CustomHeader title={`${item?.name}`} />
      <UpperHeader />
      <HomeSearch
        placeholder={'Search “Rajma Chawal near you”'}
        value={searchText}
        onchange={text => setSearchText(text)}
      />
      {/* Header View */}
      <View style={styles.contentHolder}>
        <Text style={styles.text2}>{` ${item?.name} - ${item?.type}`}</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        statusBarTranslucent
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, {flex: 0}]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}>
              <Feather name="x" size={responsive(25)} color={AppColor.black} />
            </TouchableOpacity>
            <Text style={styles.messageText}>
              Below are the contact Details
            </Text>
            <Text style={styles.nameText}>
              Address : - {contactDetails?.address}
            </Text>
            <Text style={styles.nameText}>
              Contact : - {contactDetails?.phone}
            </Text>
            <Text style={styles.nameText}>
              Email Id : - {contactDetails?.email}
            </Text>
            <CustomButton
              title={'Submit'}
              color={AppColor.yellow}
              textColor={AppColor.white}
              handleAction={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WeekendPartyRestaurantList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  contentHolder: {
    borderWidth: 2,
    backgroundColor: AppColor.red,
    borderColor: AppColor.red,
    width: '95%',
    borderRadius: responsive(20),
    alignSelf: 'center',
    marginVertical: responsive(10),
    elevation: responsive(10),
  },
  text2: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.white,
    textAlign: 'center',
    padding: responsive(5),
  },
  renderItem: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsive(5),
    borderRadius: responsive(5),
    backgroundColor: AppColor.white,
    elevation: responsive(5),
  },
  itemHolder: {
    flexDirection: 'row',
    padding: responsive(10),
  },
  imageHolder: {
    width: '25%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: responsive(150),
    borderRadius: responsive(10),
  },
  detailsHolder: {
    width: '65%',
    gap: responsive(5),
    padding: responsive(5),
  },
  nameText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
    letterSpacing: 1,
  },
  descriptionText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.borderColor,
    fontSize: responsive(14),
    textAlign: 'justify',
  },
  iconHolder: {
    width: '10%',
  },
  buttonHolder: {
    width: '35%',
    alignSelf: 'flex-end',
    marginRight: responsive(25),
    marginBottom: responsive(10),
  },
  renderItem2: {
    width: '100%',
    marginVertical: responsive(5),
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
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
});
