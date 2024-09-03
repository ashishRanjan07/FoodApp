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
import {AppColor} from '../../utils/AppColor';
import HomeSearch from '../../components/Home/HomeSearch';
import {responsive} from '../../utils/Responsive';
import UpperHeader from '../../components/Home/UpperHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Data from '../../assets/json/FoodItem.json';
import {useNavigation} from '@react-navigation/native';
const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleSearchProduct = item => {
    navigation.navigate('Food Details', {item: item});
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        onPress={() => handleSearchProduct(item)}>
        <Image
          source={{
            uri: `https://picsum.photos/id/${item.id}/200/300`,
          }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={{paddingHorizontal: responsive(5)}}>
          <Text style={styles.nameText}>{item?.name}</Text>
          <Text style={styles.typeText}>{item?.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={AppColor.yellow} barStyle={'dark-content'} />
      <UpperHeader />
      <View style={{flex:1}}>
        <HomeSearch
          placeholder={'Search “Fish Curry near you”'}
          value={searchText}
          onchange={text => setSearchText(text)}
        />
        <View style={styles.filterHolder}>
          {/* sort */}
          <TouchableOpacity style={styles.buttonHolder}>
            <Fontisto
              name="equalizer"
              size={responsive(25)}
              color={AppColor.black}
            />
            <Text style={styles.buttonText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHolder}>
            <Text style={styles.buttonText}>Distance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHolder}>
            <Fontisto
              name="calendar"
              size={responsive(25)}
              color={AppColor.black}
            />
            <Text style={styles.buttonText}>Date</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHolder}>
            <Text style={styles.buttonText}>Pincode</Text>
          </TouchableOpacity>
        </View>

        {/* Recommended and Near & Fast  */}
        <View style={styles.buttonHolder2}>
          <TouchableOpacity
            style={[styles.button2, {backgroundColor: AppColor.success}]}>
            <Text style={styles.buttonText2}>Recommended</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button2, {backgroundColor: AppColor.yellow}]}>
            <Text style={styles.buttonText2}>Near & Fast </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center',flex:1}}>
          <FlatList
            data={Data?.foodItems}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            numColumns={3}
          />
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  filterHolder: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:responsive(5)
  },
  buttonHolder: {
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: responsive(8),
    borderRadius: responsive(5),
    backgroundColor: AppColor.light,
    borderColor: AppColor.light,
  },
  buttonText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
    color: AppColor.black,
    textAlign: 'center',
  },
  buttonHolder2: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth:2,
    borderRadius: responsive(15),
    overflow: 'hidden',
    marginVertical: responsive(10),
  },
  button2: {
    width: '50%',
  },
  buttonText2: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    padding: responsive(10),
    textAlign: 'center',
    fontSize: responsive(16),
  },
  renderItem: {
    borderWidth: 2,
    width: responsive(125),
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
    height: responsive(25),
    color: AppColor.black,
    fontSize: responsive(16),
    fontFamily: 'NotoSans-Medium',
  },
  typeText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.red,
    fontSize: responsive(16),
  },
});
