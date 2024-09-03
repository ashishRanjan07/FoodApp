import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import CustomHeader from '../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import UpperHeader from '../../components/Home/UpperHeader';
import {responsive} from '../../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeSearch from '../../components/Home/HomeSearch';

const RestaurantFoodList = ({route}) => {
  const navigation = useNavigation();
  const {item, date} = route.params;
  // console.log(item?.Menu, date, 'Line 10');
  const [searchText, setSearchText] = useState('');
  const [itemQuantities, setItemQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    item?.Menu.forEach(menuItem => {
      initialQuantities[menuItem.Item_ID] = 0;
    });
    setItemQuantities(initialQuantities);
    setCartItems({});
    updateCartCount();
  }, [item]);

  useEffect(() => {
    updateCartCount();
  }, [itemQuantities]);

  const updateCartCount = () => {
    setCartCount(
      Object.values(itemQuantities).reduce(
        (sum, quantity) => sum + quantity,
        0,
      ),
    );
  };

  const handlePlusClick = itemId => {
    setItemQuantities(prevState => ({
      ...prevState,
      [itemId]: prevState[itemId] + 1,
    }));
    updateCartItems(itemId);
  };

  const handleMinusClick = itemId => {
    setItemQuantities(prevState => ({
      ...prevState,
      [itemId]: Math.max(0, prevState[itemId] - 1),
    }));
    updateCartItems(itemId);
  };

  const updateCartItems = itemId => {
    const menuItem = item.Menu.find(menuItem => menuItem.Item_ID === itemId);
    if (!menuItem) return;

    setCartItems(prevState => {
      const newCartItems = {...prevState};
      if (itemQuantities[itemId] > 0) {
        newCartItems[itemId] = {
          ...menuItem,
          quantity: itemQuantities[itemId],
        };
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });
  };

  const handleCartClicked = () => {
    navigation.navigate('Cart', {cartItems, item, date});
  };

  const staticImageUrl = 'https://picsum.photos/200/300';
  const renderItem = ({item}) => {
    const quantity = itemQuantities[item.Item_ID];
    return (
      <View style={styles.renderItem}>
        <View style={{width: '40%', alignItems: 'center'}}>
          <Image
            source={{uri: staticImageUrl}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        </View>

        <View style={{width: '60%', gap: responsive(5)}}>
          <Text style={styles.name}>{item?.Name}</Text>
          <Text style={styles.priceText}>Rs.{item?.Price}</Text>
          <Text
            style={styles.pickupText}>{`You can pick up ${item?.time}`}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {item?.Description}
          </Text>
          <View style={styles.lowerButtonHolder}>
            <View style={styles.selectQty}>
              <TouchableOpacity
                style={styles.plusHolder}
                onPress={() => handlePlusClick(item.Item_ID)}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>

              <Text style={styles.countText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.plusHolder}
                onPress={() => handleMinusClick(item.Item_ID)}>
                <Text style={styles.plus}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.selectQty,
                {
                  backgroundColor: AppColor.success,
                  borderColor: AppColor.white,
                },
              ]}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
      <View style={styles.catHolder}>
        <View style={{width: '50%'}}>
          <Text style={styles.text}>{item?.Restaurant_Name}</Text>
          <Text style={[styles.text, {color: AppColor.red}]}>{date}</Text>
        </View>
        <TouchableOpacity style={{width: '50%', alignItems: 'flex-end'}}>
          <MaterialCommunityIcons
            name="android-messages"
            size={responsive(30)}
            color={AppColor.yellow}
          />
          <Text
            style={[
              styles.text,
              {color: AppColor.black, fontSize: responsive(18)},
            ]}>
            Bulk Order Booking
          </Text>
        </TouchableOpacity>
      </View>
      {/* Food List Flat List */}
      <FlatList
        data={item?.Menu}
        renderItem={renderItem}
        keyExtractor={item => item?.Item_ID}
      />
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.addToCardButton}
          onPress={handleCartClicked}>
          <Text style={styles.addToCardButtonText}>
            {cartCount} Items Added to Cart
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={responsive(24)}
            color={AppColor.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RestaurantFoodList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  text: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(20),
    color: AppColor.success,
  },
  catHolder: {
    marginVertical: responsive(10),
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(10),
  },
  imageStyle: {
    height: responsive(200),
    width: responsive(150),
    borderRadius: responsive(10),
  },
  renderItem: {
    flexDirection: 'row',
    padding: responsive(5),
    width: '95%',
    alignSelf: 'center',
    gap: responsive(10),
    marginBottom: responsive(5),
    backgroundColor: AppColor.white,
    borderRadius: responsive(10),
    elevation: responsive(10),
  },
  name: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(20),
  },
  priceText: {
    fontSize: responsive(17),
    color: AppColor.success,
    fontFamily: 'NotoSans-Medium',
  },
  pickupText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(16),
    color: AppColor.red,
  },
  descriptionText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.black,
    paddingEnd: responsive(20),
  },
  lowerButtonHolder: {
    position: 'absolute',
    width: '95%',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  selectQty: {
    borderWidth: 2,
    width: '45%',
    padding: responsive(10),
    borderRadius: responsive(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: responsive(2),
    borderColor: AppColor.borderColor,
  },
  buttonText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.white,
    fontSize: responsive(14),
    textAlign: 'center',
  },
  plus: {
    color: AppColor.red,
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
  },
  countText: {
    fontSize: responsive(14),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
  },
  plusHolder: {
    borderWidth: 2,
    paddingHorizontal: responsive(10),
    backgroundColor: AppColor.light,
    borderRadius: responsive(5),
    borderColor: AppColor.light,
  },
  addToCardButton: {
    borderWidth: 2,
    width: '100%',
    bottom: 0,
    padding: responsive(10),
    borderTopLeftRadius: responsive(70),
    borderTopRightRadius: responsive(70),
    backgroundColor: AppColor.yellow,
    borderColor: AppColor.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCardButtonText: {
    fontSize: responsive(18),
    color: AppColor.white,
    fontFamily: 'NotoSans-Medium',
  },
});
