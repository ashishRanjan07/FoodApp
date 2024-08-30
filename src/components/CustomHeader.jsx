import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {responsive} from '../utils/Responsive';
import {AppColor} from '../utils/AppColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const CustomHeader = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="arrow-back"
          color={AppColor.black}
          size={responsive(30)}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    gap: responsive(10),
    padding: responsive(10),
    backgroundColor: AppColor.yellow,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(20),
    letterSpacing: responsive(1),
    width: '80%',
    textAlign: 'center',
  },
});
