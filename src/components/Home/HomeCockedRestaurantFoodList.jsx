import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import CustomHeader from '../CustomHeader';
import UpperHeader from './UpperHeader';
import HomeSearch from './HomeSearch';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {responsive} from '../../utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
const HomeCockedRestaurantFoodList = ({route}) => {
  const navigation = useNavigation();
  const {item, name, date} = route.params;
  const [searchText, setSearchText] = useState('');
  const [itemQuantities, setItemQuantities] = useState({});
  const [cartCount, setCartCount] = useState();
  const [cartItems, setCartItems] = useState({});
  const staticImageUrl = 'https://picsum.photos/200/300';
  const [groupedData, setGroupedData] = useState({});
  const [addButtonClicked, setAddButtonClicked] = useState({}); // Track the state for each item

  const handleCartClicked = () => {
    navigation.navigate('Cart', {
      cartItems,
      item,
      date,
      restaurantName: name,
    });
  };

  useEffect(() => {
    const initialQuantities = {};
    if (item?.Menu_by_date) {
      const grouped = groupItemsByDate(item.Menu_by_date);
      setGroupedData(grouped);
      Object.entries(grouped).forEach(([date, items]) => {
        items.forEach(item => {
          initialQuantities[item.Item_ID] = 0;
        });
      });
    }
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

  const handlePlusClick = item => {
    setItemQuantities(prev => ({
      ...prev,
      [item.Item_ID]: (prev[item.Item_ID] || 0) + 1,
    }));

    updateCartItems(item, (itemQuantities[item.Item_ID] || 0) + 1);
  };

  const handleMinusClick = item => {
    setItemQuantities(prev => ({
      ...prev,
      [item.Item_ID]: Math.max(0, (prev[item.Item_ID] || 0) - 1),
    }));

    updateCartItems(item, Math.max(0, (itemQuantities[item.Item_ID] || 0) - 1));
  };

  const updateCartItems = (item, newQuantity) => {
    setCartItems(prevState => {
      const newCartItems = {...prevState};
      if (newQuantity > 0) {
        newCartItems[item.Item_ID] = {
          ...item,
          quantity: newQuantity,
        };
      } else {
        delete newCartItems[item.Item_ID];
      }
      return newCartItems;
    });
  };

  const groupItemsByDate = data => {
    const groupedData = {};
    Object.entries(data).forEach(([date, items]) => {
      items.forEach(item => {
        if (!groupedData[date]) {
          groupedData[date] = [];
        }
        groupedData[date].push(item);
      });
    });
    return groupedData;
  };

  const renderItem2 = ({item}) => {
    const quantity = itemQuantities[item.Item_ID] || 0;
    const isAddButtonClicked = addButtonClicked[item.Item_ID] || false; // Get the state for each item

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.imageHolder}>
          <Image
            source={{uri: staticImageUrl}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.nameText}>{item.Name}</Text>
          <Text style={[styles.text, {color: AppColor.green}]}>
            ₹{item.Price}
          </Text>
          <Text style={styles.pickupText}>Pickup {item.time}</Text>
        </View>

        <View style={styles.addButtonHolder}>
          {isAddButtonClicked ? (
            <View style={styles.conditionalButton}>
              <TouchableOpacity
                style={styles.plusHolder}
                onPress={() => handleMinusClick(item)}>
                <Text style={styles.plus}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.plusHolder, {width: '20%'}]}>
                <Text style={[styles.plus, {fontSize: responsive(16)}]}>
                  {quantity}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.plusHolder}
                onPress={() => handlePlusClick(item)}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handlePlusClick(item);
                setAddButtonClicked(prevState => ({
                  ...prevState,
                  [item.Item_ID]: true, // Track state for the specific item
                }));
              }}>
              <Text style={styles.addToCardButtonText}>Add Item</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.dateContainer}>
        <View style={styles.dateHolder}>
          <AntDesign
            name="calendar"
            size={responsive(35)}
            color={AppColor.green}
          />
          <Text style={styles.dateText}>{item}</Text>
        </View>

        <FlatList
          data={groupedData[item]}
          renderItem={renderItem2}
          keyExtractor={item => item.Item_ID.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <CustomHeader title={name} />
      <UpperHeader />
      <HomeSearch
        placeholder={`Search “food from ${name}”`}
        value={searchText}
        onchange={text => setSearchText(text)}
      />
      <View style={styles.catHolder}>
        <View style={{width: '50%'}}>
          <Text style={styles.text}>{name}</Text>
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

      <FlatList
        data={Object.keys(groupedData)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
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

export default HomeCockedRestaurantFoodList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
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
  text: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
    color: AppColor.success,
  },
  dateText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
    color: AppColor.green,
  },
  dateHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(10),
    marginBottom: responsive(10),
  },
  dateContainer: {
    borderTopWidth: 2,
    borderColor: AppColor.borderColor,
    width: '95%',
    alignSelf: 'center',
    padding: responsive(10),
    borderRadius: responsive(10),
    backgroundColor: AppColor.white,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: responsive(5),
    borderRadius: responsive(10),
    gap: responsive(10),
  },
  imageStyle: {
    width: responsive(80),
    height: responsive(80),
    borderRadius: responsive(10),
    alignSelf: 'center',
  },
  imageHolder: {
    width: '20%',
    overflow: 'hidden',
    borderRadius: responsive(10),
  },
  textView: {
    width: '50%',
    gap: responsive(5),
    justifyContent: 'space-evenly',
  },
  nameText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
  },
  pickupText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.red,
    fontSize: responsive(14),
  },
  operatorHolder: {
    width: '35%',
    alignItems: 'center',
  },
  selectQty: {
    borderWidth: 2,
    width: '100%',
    padding: responsive(10),
    borderRadius: responsive(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: responsive(2),
    borderColor: AppColor.borderColor,
  },
  countText: {
    fontSize: responsive(14),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
  },
  plusHolder: {
    width: '35%',
    alignItems: 'center',
  },
  plus: {
    color: AppColor.white,
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(20),
  },
  buttonText: {
    fontFamily: 'NotoSans-Regular',
    color: AppColor.white,
    fontSize: responsive(12),
    textAlign: 'center',
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
  addButtonHolder: {
    width: '25%',
    backgroundColor: AppColor.green,
    padding: responsive(10),
    borderRadius: responsive(10),
    alignItems: 'center',
    alignSelf: 'center',
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
