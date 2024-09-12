import {
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
import {AppColor} from '../../utils/AppColor';
import UpperHeader from './UpperHeader';
import HomeSearch from './HomeSearch';
import {responsive} from '../../utils/Responsive';

const HomeCoockedMealServices = ({route}) => {
  const navigation = useNavigation();
  const {item, type} = route.params;
  const [searchText, setSearchText] = useState('');

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity key={item?.id}
        style={[
          styles.renderItem,
          {backgroundColor: item?.color, borderColor: item?.color},
        ]}
        onPress={() =>
          navigation.navigate('Home Cocked RestaurantList', {item: item,name:type?.name})
        }>
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
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <CustomHeader title={type?.name} />
      <UpperHeader />
      <HomeSearch
        placeholder={`Search “food from ${type?.name}”`}
        value={searchText}
        onchange={text => setSearchText(text)}
      />
      <View>
        <Text style={styles.headerText}>
          {type?.name} - {type?.type}
        </Text>
      </View>

      <View style={styles.contentHolder}>
        <Text style={styles.text2}>Choose your preferred meal</Text>
      </View>
      <View style={{flex: 1, alignSelf: 'center', width: '100%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default HomeCoockedMealServices;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  headerText: {
    fontSize: responsive(18),
    color: AppColor.black,
    textAlign: 'center',
    fontFamily: 'NotoSans-Medium',
    marginVertical: responsive(10),
  },
  contentHolder: {
    borderWidth: 2,
    backgroundColor: AppColor.green,
    borderColor: AppColor.green,
    width: '98%',
    borderRadius: responsive(20),
    alignSelf: 'center',
    marginVertical: responsive(10),
    elevation: responsive(10),
    paddingVertical: responsive(10),
  },
  text2: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(17),
    color: AppColor.white,
    textAlign: 'center',
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
  imageStyle: {
    width: '45%',
    height: responsive(150),
  },
  detailsContainer: {
    width: '55%',
    padding: responsive(10),
    gap: responsive(10),
  },
  text: {
    fontSize: responsive(20),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
  },
  pickupTimeText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.white,
    fontSize: responsive(18),
  },
});
