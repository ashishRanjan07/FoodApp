import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColor} from '../../utils/AppColor';
import CustomHeader from '../CustomHeader';
import {responsive} from '../../utils/Responsive';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';

const FoodDetails = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params;
  // console.log(item, 'line 8');
  return (
    <View style={styles.main}>
      <CustomHeader title={`${item?.name}`} />
      <Image
        source={{uri: `https://picsum.photos/id/${item.id}/200/300`}}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.detailsHolder}>
        <View style={{padding: responsive(20)}}>
          <View style={styles.upperTextView}>
            <View style={{padding: responsive(10)}}>
              <Text style={styles.nameText}>{item?.name}</Text>
              <Text style={styles.secondText}>{item?.category}</Text>
            </View>
            <Text style={styles.secondText}>Rating : - {item?.rating}</Text>
          </View>
          <View style={{padding: responsive(10), gap: responsive(5)}}>
            <Text style={[styles.secondText, {color: AppColor.red}]}>
              Rs.{item?.price}
            </Text>
            <Text style={styles.nameText}>Description</Text>
            <Text style={styles.secondText}>{item?.description}</Text>
            <Text style={styles.nameText}>Ingredients</Text>
            {item?.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.secondText}>
                {index + 1}. {ingredient}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          title={'Place Order'}
          color={AppColor.yellow}
          textColor={AppColor.white}
          handleAction={()=>navigation.navigate('Success') }
        />
      </View>
    </View>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  image: {
    width: '100%',
    height: responsive(400),
  },
  detailsHolder: {
    borderWidth: 2,
    borderTopLeftRadius: responsive(50),
    borderTopRightRadius: responsive(50),
    flex: 1,
    marginTop: -100,
    backgroundColor: AppColor.white,
    elevation: responsive(10),
    borderColor: AppColor.white,
    // padding: responsive(10),
  },
  nameText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
    color: AppColor.black,
  },
  secondText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(16),
    color: AppColor.borderColor,
  },
  upperTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
