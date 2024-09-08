import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import UpperHeader from '../../components/Home/UpperHeader';
import {AppColor} from '../../utils/AppColor';
import HomeSearch from '../../components/Home/HomeSearch';
import {responsive} from '../../utils/Responsive';
import Data from '../../assets/json/MealService.json';

const RestaurantsMealServices = ({route}) => {
  const navigation = useNavigation();
  const {item, date, type} = route.params;
  console.log(type, 'Line 13');
  const [searchText, setSearchText] = useState('');
  const handleMealTypeClicked = () => {
    navigation.navigate('Restaurant Food List', {item: item, date: date});
  };
  const renderItem = ({item}) => {
    console.log(item?.pickup, 'Line 24');
    return (
      <TouchableOpacity
        onPress={handleMealTypeClicked}
        style={[
          styles.renderItem,
          {backgroundColor: item?.color, borderColor: item?.color},
        ]}>
        <Image
          source={{uri: item?.image}}
          resizeMode="cover"
          style={styles.imageStyle}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>{item?.name}</Text>
          <Text style={styles.pickupTimeText}>{item?.pickup}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      <CustomHeader title={item?.Restaurant_Name} />
      <UpperHeader />
      <HomeSearch
        placeholder={`Search “food from ${item?.Restaurant_Name}”`}
        value={searchText}
        onchange={text => setSearchText(text)}
      />
      <View style={styles.contentHolder}>
        <Text
          style={
            styles.text2
          }>{` ${item?.Restaurant_Name} - ${type} for ${date}`}</Text>
      </View>
      <View style={{flex: 1, alignSelf: 'center', width: '100%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default RestaurantsMealServices;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  contentHolder: {
    borderWidth: 2,
    backgroundColor: AppColor.red,
    borderColor: AppColor.red,
    width: '90%',
    borderRadius: responsive(20),
    alignSelf: 'center',
    marginVertical: responsive(10),
    elevation: responsive(10),
  },
  text2: {
    fontFamily: 'NotoSans-Bold',
    fontSize: responsive(16),
    color: AppColor.white,
    textAlign: 'center',
    padding: responsive(10),
  },
  imageStyle: {
    width: '45%',
    height: responsive(150),
  },
  text: {
    fontSize: responsive(20),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
  },
  renderItem: {
    borderWidth: 2,
    padding: responsive(10),
    borderRadius: responsive(10),
    backgroundColor: AppColor.white,
    elevation: responsive(10),
    width: '98%',
    alignSelf: 'center',
    marginVertical: responsive(5),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsive(10),
    alignItems: 'center',
  },
  detailsContainer: {
    width: '55%',
    padding: responsive(10),
    gap: responsive(10),
  },
  pickupTimeText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
  },
});
