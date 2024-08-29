import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Switcher from './Switcher';
import { responsive } from '../utils/Responsive';
import { AppColor } from '../utils/AppColor';

const CustomBottomModel = ({
  visible,
  onClose,
  onConfirm,
  message,
  iconName,
  name,
  isEnabled,
  isEnabledValued,
  isNotEnabledValue,
  handleEnable,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={responsive(25)} color={AppColor.black} />
          </TouchableOpacity>
          <Text style={styles.messageText}>{message}</Text>
          <Switcher
            iconName={iconName}
            name={name}
            isEnabled={isEnabled}
            isEnabledValued={isEnabledValued}
            isNotEnabledValue={isNotEnabledValue}
            handleEnable={handleEnable}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomBottomModel;

const styles = StyleSheet.create({
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
    // flex: 0.6,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  messageText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(20),
    color: AppColor.primary,
    textAlign: 'center',
  },
});
