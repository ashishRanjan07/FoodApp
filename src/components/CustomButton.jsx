import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsive} from '../utils/Responsive';
import {AppColor} from '../utils/AppColor';

const CustomButton = ({title, handleAction, color, textColor}) => {
  return (
    <TouchableOpacity
      onPress={() => handleAction()}
      style={[styles.main, {backgroundColor: color, borderColor: color}]}>
      <Text style={[styles.text, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  main: {
    borderWidth: 2,
    marginVertical: responsive(10),
    alignItems: 'center',
    padding: responsive(15),
    borderRadius: responsive(10),
  },
  text: {
    color: AppColor.black,
    fontSize: responsive(18),
    fontFamily: 'NotoSans-Medium',
    letterSpacing: responsive(1),
  },
});
