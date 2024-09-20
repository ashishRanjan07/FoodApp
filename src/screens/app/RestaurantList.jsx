import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import UpperHeader from '../../components/Home/UpperHeader';
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';
import Data from '../../assets/json/RestaurantList.json';
import {useNavigation} from '@react-navigation/native';

const RestaurantList = ({route}) => {
  const navigation = useNavigation();
  const {item, date} = route.params;
  // console.log(date, 'Line 21');
  const type = item?.type;
  const typeName = item?.name;
  const [isLoading, setIsLoading] = useState(true);

  const handleRestaurantClicked = item => {
    const Address = item?.Address;
    // navigation.navigate('Restaurant Food List', {item: item, date: date});
    navigation.navigate('Meal Services', {
      item: item,
      date: date,
      type: type,
      address: Address,
      typeName: typeName,
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.renderItem, {backgroundColor: item?.color}]}
        onPress={() => handleRestaurantClicked(item)}>
        <View>
          {isLoading && (
            <View style={styles.loaderView}>
              <View style={styles.loaderContainer}>
                <ActivityIndicator size={'large'} color={AppColor.yellow} />
                <Text style={styles.loaderText}>Please wait...</Text>
              </View>
            </View>
          )}
          <Image
            source={{uri: item?.restaurant_Image}}
            resizeMode="cover"
            style={styles.image}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        </View>
        <View style={{padding: responsive(5)}}>
          <Text
            style={[
              styles.nameText,
              {
                color:
                  item?.Restaurant_Name === 'Mita’s Kitchen'
                    ? AppColor.white
                    : AppColor.black,
              },
            ]}>
            {item?.Restaurant_Name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.main}>
      <CustomHeader title={`${item?.name}`} />
      <UpperHeader />
      <View style={styles.contentHolder}>
        <Text
          style={
            styles.text2
          }>{` ${item?.name} - ${item?.type} for ${date}`}</Text>
      </View>
      {/* Recommended and Near & Fast  */}
      <View style={styles.buttonHolder}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: AppColor.success}]}>
          <Text style={styles.buttonText}>Recommended</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: AppColor.yellow}]}>
          <Text style={styles.buttonText}>Near & Fast </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.Restaurant_ID}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  text: {
    fontFamily: 'NotoSana-ExtraBold',
    fontSize: responsive(20),
    color: AppColor.yellow,
    textAlign: 'center',
    width: '95%',
    padding: responsive(10),
    alignSelf: 'center',
  },
  renderItem: {
    borderWidth: 2,
    width: '48%',
    margin: responsive(5),
    backgroundColor: '#F8F6F4',
    borderRadius: responsive(10),
    overflow: 'hidden',
    borderColor: '#F8F6F4',
    gap: responsive(5),
    height: responsive(225),
  },
  image: {
    height: responsive(150),
    width: '100%',
  },
  nameText: {
    width: '100%',
    height: responsive(25),
    color: AppColor.black,
    fontSize: responsive(18),
    fontFamily: 'NotoSans-Medium',
  },
  loaderText: {
    fontSize: responsive(18),
    color: 'black',
    textAlign: 'center',
  },
  loaderView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
  },
  loaderContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  buttonHolder: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth:2,
    borderRadius: responsive(15),
    overflow: 'hidden',
    marginVertical: responsive(10),
  },
  button: {
    width: '50%',
  },
  buttonText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    padding: responsive(10),
    textAlign: 'center',
    fontSize: responsive(16),
  },
  contentHolder: {
    borderWidth: 2,
    backgroundColor: AppColor.red,
    borderColor: AppColor.red,
    width: '95%',
    borderRadius: responsive(20),
    alignSelf: 'center',
    marginVertical: responsive(10),
    elevation: responsive(10),
  },
  text2: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.white,
    textAlign: 'center',
    padding: responsive(5),
  },
});
