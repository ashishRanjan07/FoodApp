import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Data from '../../assets/json/Notification.json';
import {AppColor} from '../../utils/AppColor';
import CustomHeader from '../../components/CustomHeader';
import {responsive} from '../../utils/Responsive';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';

const Notification = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();

  const handleClicked = item => {
    // console.log(item, 'Line 21');
    setShowModal(!showModal);
    setData(item);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleClicked(item)}
        style={[
          styles.renderHolder,
          {backgroundColor: item?.read ? AppColor.light : '#E6E6FA'},
        ]}>
        <View style={styles.itemHolder}>
          <View style={styles.imageHolder}>
            <Image
              source={{uri: item?.image_url}}
              resizeMode="cover"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.textHolder}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.message}>{item?.message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <CustomHeader title={'Notification'} />
      <FlatList
        data={Data?.notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id}
      />
      {/* Custom Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        statusBarTranslucent
        onRequestClose={() => setShowModal(!showModal)}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(!showModal)}>
              <Feather name="x" size={responsive(25)} color={AppColor.black} />
            </TouchableOpacity>
            <Text style={styles.messageText}>{data?.title}</Text>
            {data?.title === 'Order Confirmed' && (
              <View style={styles.orderConfirmed}>
                <Text style={styles.text}>{data?.message}</Text>
                <Text
                  style={[
                    styles.message,
                    {textAlign: 'center'},
                  ]}>{`Hii, ${data?.user?.name} your order ${data?.order_id} has been ${data?.status} from ${data?.metadata?.restaurant_name} and estimated preparation time is ${data?.metadata?.estimated_preparation_time}.`}</Text>
                <CustomButton
                  title={'Track Status'}
                  color={AppColor.yellow}
                  textColor={AppColor.white}
                  handleAction={() => setShowModal(!showModal)}
                />
              </View>
            )}
            {data?.title === 'Order Dispatched' && (
              <View style={styles.orderConfirmed}>
                <Text style={styles.text}>{data?.message}</Text>
                <Text
                  style={[
                    styles.message,
                    {textAlign: 'center'},
                  ]}>{`Hii, ${data?.user?.name} your order ${data?.order_id} has been ${data?.status} from ${data?.metadata?.restaurant_name} .`}</Text>
                <Text
                  style={
                    styles.text2
                  }>{`Your captain name is ${data?.delivery_details?.driver_name} coming to your address ${data?.metadata?.delivery_address} by using ${data?.delivery_details?.vehicle} and their contact number is ${data?.delivery_details?.contact_number} `}</Text>
                <CustomButton
                  title={'Close'}
                  color={AppColor.yellow}
                  textColor={AppColor.white}
                  handleAction={() => setShowModal(!showModal)}
                />
              </View>
            )}
            {data?.title === 'Special Offer!' && (
              <View style={styles.orderConfirmed}>
                <Text style={styles.text}>{data?.message}</Text>
                <Text style={[styles.text, {color: AppColor.red}]}>
                  {data?.metadata?.terms_and_conditions}
                </Text>
                <CustomButton
                  title={'Close'}
                  color={AppColor.yellow}
                  textColor={AppColor.white}
                  handleAction={() => setShowModal(!showModal)}
                />
              </View>
            )}
            {data?.title === 'New Restaurant Added' && (
              <View style={styles.orderConfirmed}>
                <Text style={styles.text}>{data?.message}</Text>
                <Text style={[styles.text, {color: AppColor.red}]}>
                  {' '}
                  It's main food category is {data?.metadata?.cuisine}
                </Text>
                <CustomButton
                  title={'Close'}
                  color={AppColor.yellow}
                  textColor={AppColor.white}
                  handleAction={() => setShowModal(!showModal)}
                />
              </View>
            )}
            {data?.title === 'Order Delivered' && (
              <View style={styles.orderConfirmed}>
                <Text style={styles.text}>{data?.message}</Text>
                <CustomButton
                  title={'Close'}
                  color={AppColor.yellow}
                  textColor={AppColor.white}
                  handleAction={() => setShowModal(!showModal)}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  renderHolder: {
    marginBottom: responsive(2),
    padding: responsive(10),
  },
  imageHolder: {
    width: responsive(60),
    height: responsive(60),
    borderWidth: 2,
    borderColor: AppColor.borderColor,
    borderRadius: responsive(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: responsive(50),
    height: responsive(50),
    borderRadius: responsive(25),
  },
  itemHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
  },
  title: {
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
  },
  message: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.blue,
  },
  textHolder: {
    width: '85%',
    gap: responsive(5),
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
  orderConfirmed: {
    gap: responsive(10),
  },
  text: {
    fontSize: responsive(15),
    color: AppColor.success,
    fontFamily: 'NotoSans-Medium',
  },
  text2: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(16),
    color: AppColor.black,
    letterSpacing: responsive(1),
    textAlign: 'justify',
  },
});
