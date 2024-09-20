import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../CustomHeader';
import UpperHeader from './UpperHeader';
import {AppColor} from '../../utils/AppColor';
import HomeSearch from './HomeSearch';
import {responsive} from '../../utils/Responsive';

const HomeCockedRestaurantList = ({route}) => {
  const navigation = useNavigation();
  const {item, name} = route.params;
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleRestaurantClicked = item => {
    navigation.navigate('Calendar', {
      item: item,
      name: name,
    });
  };

  const renderItem = ({item}) => {
    // console.log(item,"Line 28")
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
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <CustomHeader title={`${name}`} />
      <UpperHeader />
      <HomeSearch
        placeholder={`Search “food from ${name}”`}
        value={searchText}
        onchange={text => setSearchText(text)}
      />
      <View style={styles.contentHolder}>
        <Text style={styles.text2}>{` Choose your ${name}`}</Text>
      </View>

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
          data={item?.restaurantList}
          renderItem={renderItem}
          keyExtractor={item => item.Restaurant_ID}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default HomeCockedRestaurantList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
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
    fontSize: responsive(16),
    color: AppColor.white,
    textAlign: 'center',
    padding: responsive(5),
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
});
