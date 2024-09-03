import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import {AppColor} from '../../utils/AppColor';

const UpperHeader = () => {
  return (
    <View style={styles.upperHeaderHolder}>
      <View style={styles.textHolder}>
        <Text style={styles.nameText1}>Hello Debjani Sarkar </Text>
        <Text style={styles.nameText}>What would you like to eat today?</Text>
      </View>
      <View style={styles.imageHolder}>
        <Image
          source={ImagePath.user}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </View>
    </View>
  );
};

export default UpperHeader;

const styles = StyleSheet.create({
  upperHeaderHolder: {
    backgroundColor: AppColor.white,
    padding: responsive(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHolder: {
    padding: responsive(10),
    gap: responsive(5),
    width: '70%',
  },
  nameText1: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
    width: '100%',
  },
  nameText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.borderColor,
    fontSize: responsive(16),
    width: '100%',
  },
  imageStyle: {
    height: responsive(75),
    width: responsive(75),
  },
  imageHolder: {
    width: '30%',
    alignItems: 'center',
  },
});
