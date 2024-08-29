import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppColor} from '../utils/AppColor';
import {responsive} from '../utils/Responsive';
import Feather from 'react-native-vector-icons/Feather';

const CustomListHolder = ({Icon, IconName, title, handleAction}) => {
  return (
    <TouchableOpacity style={styles.listHolder} onPress={handleAction}>
      <Icon name={IconName} color={AppColor.success} size={responsive(24)} />
      <Text style={styles.listText}>{title}</Text>
      <Feather
        name="arrow-right"
        color={AppColor.success}
        size={responsive(24)}
      />
    </TouchableOpacity>
  );
};

export default CustomListHolder;

const styles = StyleSheet.create({
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
});
