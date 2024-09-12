import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';

const Category = ({
  visibleCategories,
  selectedCategory,
  handleCategory,
  showAll,
  handleShowAll,
}) => {
    // console.log(visibleCategories,selectedCategory,handleCategory,showAll,handleShowAll,"Line 13")
  const visibleItems = showAll
    ? visibleCategories
    : visibleCategories.slice(0, 4);
  return (
    <View style={styles.categoryHolder}>
      <View style={styles.headHolder}>
        <Text style={styles.text}>Category</Text>
        <TouchableOpacity onPress={() => handleShowAll()}>
          <Text style={[styles.text, {color: AppColor.blue}]}>
            {showAll ? 'Show Less' : 'See All'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        {visibleItems.map(item => (
          <TouchableOpacity
            onPress={() => handleCategory(item.id)}
            style={[
              styles.catView,
              {
                backgroundColor:
                  selectedCategory === item?.id
                    ? AppColor.success
                    : AppColor.white,
              },
            ]}
            key={item?.id}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={styles.imageStyle}
            />
            <Text style={styles.text2}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryHolder: {
    width: '100%',
    marginVertical: responsive(10),
    alignSelf: 'center',
    padding: responsive(10),
    gap: responsive(5),
  },
  text: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
  },
  headHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  catView: {
    borderWidth: 2,
    alignItems: 'center',
    gap: responsive(5),
    padding: responsive(5),
    borderRadius: responsive(5),
    marginHorizontal: responsive(4),
    width: responsive(90),
    backgroundColor: AppColor.white,
    borderColor: AppColor.borderColor,
  },
  imageStyle: {
    width: responsive(50),
    height: responsive(50),
    borderRadius: responsive(25),
  },
  text2: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(12),
    textAlign: 'center',
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});
