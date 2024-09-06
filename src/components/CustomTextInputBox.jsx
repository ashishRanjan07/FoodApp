import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {responsive} from '../utils/Responsive';
import {AppColor} from '../utils/AppColor';

const CustomTextInputBox = ({
  Icon,
  IconName,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  maxLength,
  secureText,
}) => {
  return (
    <View style={styles.box}>
      <Icon name={IconName} size={responsive(30)} color={AppColor.success} style={{paddingHorizontal:responsive(5)}}/>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={AppColor.success}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.textInputStyle}
        maxLength={maxLength}
        secureTextEntry={secureText}
      />
    </View>
  );
};

export default CustomTextInputBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    padding: responsive(5),
    borderRadius: responsive(10),
    borderColor: '#AFE1AF',
    flexDirection: 'row',
    gap: responsive(5),
    alignItems: 'center',
    backgroundColor: '#AFE1AF',
  },
  textInputStyle: {
    width: '90%',
    paddingHorizontal: responsive(10),
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
  },
});
