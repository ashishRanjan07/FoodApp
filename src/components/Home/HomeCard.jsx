import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {responsive} from '../../utils/Responsive';
import {AppColor} from '../../utils/AppColor';

const HomeCard = ({name, type, image, handleAction, color}) => {
  return (
    <TouchableOpacity
      style={[styles.renderItem, {backgroundColor: color}]}
      // onPress={() => navigation.navigate('Calendar', {item: item})}
      onPress={handleAction}>
      <View>
        <Image source={image} resizeMode="cover" style={styles.image} />
      </View>
      <View style={{paddingHorizontal: responsive(5), padding: responsive(15)}}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.typeText}>{type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  renderItem: {
    borderWidth: 2,
    width: '47%',
    margin: responsive(5),
    backgroundColor: '#F8F6F4',
    borderRadius: responsive(10),
    overflow: 'hidden',
    borderColor: '#F8F6F4',
    gap: responsive(5),
  },
  image: {
    height: responsive(150),
    width: '100%',
  },
  nameText: {
    width: '100%',
    color: AppColor.black,
    fontSize: responsive(16),
    fontFamily: 'NotoSans-Medium',
  },
  typeText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.red,
    fontSize: responsive(15),
  },
});
