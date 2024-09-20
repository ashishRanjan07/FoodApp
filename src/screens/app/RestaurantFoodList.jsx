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
  const {item, date, restaurantName, address} = route.params;
  console.log(item,"Line 21");

  const [searchText, setSearchText] = useState('');
  const [itemQuantities, setItemQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState({});
  const [addButtonClicked, setAddButtonClicked] = useState({}); // Track the state for each item

  // Initialize quantities and cart items when item changes
  useEffect(() => {
    const initialQuantities = {};
    console.log(item?.Menu,"Line 32")
    item?.Menu.forEach(menuItem => {
      initialQuantities[menuItem.Item_ID] = 0;
    });
    setItemQuantities(initialQuantities);
    setCartItems({});
  }, [item]);

  // Update cart count whenever itemQuantities changes
  useEffect(() => {
    updateCartCount();
    updateCartItems();
  }, [itemQuantities]);

  const updateCartCount = () => {
    setCartCount(
      Object.values(itemQuantities).reduce(
        (sum, quantity) => sum + quantity,
        0,
      ),
    );
  };

  // Update cartItems based on itemQuantities
  const updateCartItems = () => {
    const updatedCartItems = {};
    item.Menu.forEach(menuItem => {
      const quantity = itemQuantities[menuItem.Item_ID];
      if (quantity > 0) {
        updatedCartItems[menuItem.Item_ID] = {
          ...menuItem,
          quantity,
        };
      }
    });
    setCartItems(updatedCartItems);
  };

  // Increment item quantity
  const handlePlusClick = itemId => {
    console.log(itemId,"Line 71")
    setItemQuantities(prevState => ({
      ...prevState,
      [itemId]: prevState[itemId] + 1,
    }));
  };

  // Decrement item quantity
  const handleMinusClick = itemId => {
    console.log(itemId,"Line 79")
    setItemQuantities(prevState => ({
      ...prevState,
      [itemId]: Math.max(0, prevState[itemId] - 1),
    }));
  };

  // Navigate to Cart screen with updated cartItems
  const handleCartClicked = () => {
    // Ensure that cartItems are up-to-date before navigating
    navigation.navigate('Cart', {
      cartItems,
      item,
      date,
      restaurantName,
      address,
    });
  };

  const staticImageUrl = 'https://picsum.photos/200/300';

  const handleFoodDetailsClicked = () => {
    navigation.navigate('Food Details', {item: item});
  };

  const renderItem = ({item}) => {
    const quantity = itemQuantities[item.Item_ID];
    const isAddButtonClicked = addButtonClicked[item.Item_ID] || false;
    return (
      <TouchableOpacity style={styles.renderItem}>
        <View style={styles.imageHolder}>
          <Image
            source={{uri: staticImageUrl}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.detailedHolder}>
          <Text style={styles.name}>{item?.Name}</Text>
          <Text style={styles.priceText}>Rs.{item?.Price}</Text>
          <Text
            style={styles.pickupText}>{`You can pick up ${item?.time}`}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {item?.Description}
          </Text>
          {/* <View style={styles.lowerButtonHolder}>
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
              onPress={() => handlePlusClick(item.Item_ID)}
              style={[
                styles.selectQty,
                {
                  backgroundColor: AppColor.yellow,
                  borderColor: AppColor.yellow,
                },
              ]}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.addButtonHolder}>
            {isAddButtonClicked ? (
              <View style={styles.conditionalButton}>
                <TouchableOpacity
                  style={styles.plusHolder}
                  onPress={() => handleMinusClick(item.Item_ID)}>
                  <Text style={styles.plus}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.plusHolder, {width: '20%'}]}>
                  <Text style={[styles.plus, {fontSize: responsive(16)}]}>
                    {quantity}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusHolder}
                  onPress={() => handlePlusClick(item.Item_ID)}>
                  <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  console.log(item.Item_ID,"Line 173")
                  handlePlusClick(item.Item_ID);
                  setAddButtonClicked(prevState => ({
                    ...prevState,
                    [item.Item_ID]: true, // Track state for the specific item
                  }));
                }}
                style={styles.selectQty}>
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <CustomHeader title={restaurantName} />
      <UpperHeader />
      <HomeSearch
        placeholder={`Search “food from ${restaurantName}”`}
        value={searchText}
        onchange={text => setSearchText(text)}
      />
      <View style={styles.catHolder}>
        <View style={{width: '50%'}}>
          <Text style={styles.text}>{restaurantName}</Text>
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
    width: '95%',
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
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  selectQty: {
    width: '100%',
    padding: responsive(5),
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
    fontSize: responsive(16),
    textAlign: 'center',
  },
  plus: {
    color: AppColor.white,
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(16),
  },
  countText: {
    fontSize: responsive(14),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
  },
  plusHolder: {
    width:'35%',
    padding: responsive(5),
    alignItems:'center',
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
    fontSize: responsive(16),
    color: AppColor.white,
    fontFamily: 'NotoSans-Medium',
  },
  imageHolder: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailedHolder: {
    width: '60%',
    gap: responsive(5),
  },
  addButtonHolder: {
    width: '80%',
    backgroundColor: AppColor.green,
    padding: responsive(10),
    borderRadius: responsive(10),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: responsive(10),
  },
  conditionalButton: {
    flexDirection: 'row',
    gap: responsive(5),
    alignItems: 'center',
    overflow: 'hidden',
    // borderWidth:2,
    width: '100%',
    paddingHorizontal: responsive(5),
    justifyContent: 'space-between',
  },
});
