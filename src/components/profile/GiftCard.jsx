import { StyleSheet, Text, View,Modal } from 'react-native'
import React, { useState } from 'react'
import { showToast } from '../../utils/ToastHelper';
import CustomButton from '../CustomButton';
import { AppColor } from '../../utils/AppColor';
import { responsive } from '../../utils/Responsive';
import Toast from 'react-native-toast-message';
import CustomTextInputBox from '../CustomTextInputBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const GiftCard = () => {
    const [gitCardAmount, setGiftCardAmount] = useState(501);
    const [showModal, setShowModal] = useState(false);
    const [giftCardNumber, setGiftCardNumber] = useState('');
    const [giftCardPin, setGiftCardPin] = useState('');

    const toggleModal = () => {
        setShowModal(!showModal);
      };
    
      const handleAddGiftCard = () => {
        if (giftCardNumber.trim() === '') {
          showToast(
            'error',
            'Gift Card Number Required',
            'Please provide the valid cards number to add gift card',
          );
          return;
        }
        if (giftCardPin.trim() === '') {
          showToast(
            'error',
            'Gift Card Pin Required',
            'Please provide the valid cards Pin to add gift card',
          );
          return;
        }
        console.log('Added Successfully');
        setGiftCardAmount(parseInt(gitCardAmount) + 10);
        setGiftCardNumber('');
        setGiftCardPin('');
        toggleModal();
      };

  return (
    <View style={styles.main}>
      <View style={styles.headerHolder}>
        <Text style={styles.text}>Gift Card</Text>
        <Text style={styles.amountText}>Rs.{gitCardAmount}</Text>
      </View>
      <View style={styles.buttonHolder}>
        <CustomButton
          title={'Add Gift Card'}
          color={AppColor.borderColor}
          textColor={AppColor.white}
          handleAction={toggleModal}
        />
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        onRequestClose={toggleModal}>
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text style={styles.title}>Add Gift Card</Text>
            <View style={{width: '95%', gap: responsive(10)}}>
              <CustomTextInputBox
              Icon={AntDesign}
              IconName={"creditcard"}
                placeholder={'Gift Card Number'}
                value={giftCardNumber}
                keyboardType={'number-pad'}
                onChangeText={text => setGiftCardNumber(text)}
              />
              <CustomTextInputBox
              Icon={Entypo}
              IconName={"lock"}
                placeholder={'Gift Card Pin'}
                value={giftCardPin}
                keyboardType={'number-pad'}
                onChangeText={text => setGiftCardPin(text)}
              />
              <CustomButton
                title={'Add Gift Card'}
                color={AppColor.borderColor}
                textColor={AppColor.white}
                handleAction={handleAddGiftCard}
              />
              <CustomButton
                title={'Cancel'}
                color={AppColor.borderColor}
                textColor={AppColor.white}
                handleAction={toggleModal}
              />
            </View>
          </View>
        </View>
        <Toast />
      </Modal>
    </View>
  )
}

export default GiftCard

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: AppColor.white,
        elevation: responsive(10),
        width: '100%',
        borderRadius: responsive(5),
        padding: responsive(10),
      },
      headerHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsive(10),
        marginTop: responsive(10),
      },
      text: {
        fontSize: responsive(22),
        color: 'blue',
        fontFamily: 'NotoSans-Medium',
      },
      amountText: {
        fontSize: responsive(20),
        color: AppColor.black,
        fontFamily: 'NotoSans-Medium',
      },
      buttonHolder: {
        width: '95%',
        alignSelf: 'center',
        marginVertical:responsive(10)
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
        fontSize: responsive(18),
        fontWeight: 'bold',
        marginBottom: responsive(10),
        color: AppColor.black,
      },
})