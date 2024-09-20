import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../../components/CustomHeader';
import UpperHeader from '../../../components/Home/UpperHeader';
import HomeSearch from '../../../components/Home/HomeSearch';
import {AppColor} from '../../../utils/AppColor';
import {responsive} from '../../../utils/Responsive';
import {useNavigation} from '@react-navigation/native';

// Replace Data with your JSON dataset
const Data = [
  {
    Restaurant_ID: 6304287,
    color: '#FF8400',
    Restaurant_Name: 'Raya’s Kitchen',
    restaurant_Image: require('../../../assets/image/a1.png'),
    Cuisines: 'Japanese',
    Average_Cost_for_two: 1200,
    Currency: 'Botswana Pula(P)',
    Aggregate_rating: 4.5,
    Rating_text: 'Excellent',
    Menu: {
      Item_ID: 2001,
      Name: 'Old Monk',
      Description:
        'Pan-fried dumplings filled with pork and vegetables.dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      Price: 300,
    },
  },
  {
    Restaurant_ID: 6300002,
    color: '#4F200D',
    Restaurant_Name: 'Mita’s Kitchen',
    restaurant_Image: require('../../../assets/image/a2.png'),
    Cuisines: 'Seafood, Asian, Filipino, Indian',
    Average_Cost_for_two: 4000,
    Currency: 'Botswana Pula(P)',
    Aggregate_rating: 4.4,
    Rating_text: 'Very Good',
    Menu: {
      Item_ID: 3001,
      Name: 'Grilled Shrimp Skewers',
      Description:
        'Marinated shrimp grilled to perfection.Marinated shrimp grilled to perfection.on.',
      Price: 800,
    },
  },
  // Other restaurant data...
];

const AuthenticRestaurantList = ({route}) => {
  const {item1} = route.params;
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [numberOfLines, setNumberOfLines] = useState(2);
  const [id, setId] = useState();

  useEffect(() => {
    const initialQuantities = {};
    Data.forEach(restaurant => {
      initialQuantities[restaurant.Menu.Item_ID] = 0; // Initialize all quantities to 0
    });
    setItemQuantities(initialQuantities);
    setCartItems({});
  }, []);

  useEffect(() => {
    updateCartCount();
    updateCartItems();
  }, [itemQuantities]);

  // Increment item quantity
  const handlePlusClick = itemId => {
    setItemQuantities(prevState => ({
      ...prevState,
      [itemId]: prevState[itemId] + 1, // Correctly update quantity
    }));
  };

  // Decrement item quantity
  const handleMinusClick = itemId => {
    setItemQuantities(prevState => ({
      ...prevState,
      [itemId]: Math.max(0, prevState[itemId] - 1), // Ensure quantity doesn't go below 0
    }));
  };

  const updateCartCount = () => {
    setCartCount(
      Object.values(itemQuantities).reduce(
        (sum, quantity) => sum + quantity,
        0,
      ),
    );
  };

  const updateCartItems = () => {
    const updatedCartItems = {};
    Data.forEach(restaurant => {
      const quantity = itemQuantities[restaurant.Menu.Item_ID];
      if (quantity > 0) {
        updatedCartItems[restaurant.Menu.Item_ID] = {
          ...restaurant.Menu,
          quantity,
        };
      }
    });
    setCartItems(updatedCartItems);
  };

  const handleCartClicked = () => {
    // Ensure that cartItems are up-to-date before navigating
    navigation.navigate('Cart', {
      cartItems,
      item: Data,
      restaurantName: 'Abc',
      address: 'bairiya Patna',
    });
  };
  const renderItem = ({item}) => {
    const quantity = itemQuantities[item.Menu.Item_ID] || 0;

    return (
      <View key={item.Restaurant_ID} style={styles.renderItem}>
        <View style={styles.itemHolder}>
          <View style={styles.imageHolder}>
            <Image
              source={item?.restaurant_Image}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          <View style={styles.detailsHolder}>
            <Text style={styles.nameText}>{item.Restaurant_Name}</Text>
            <Text
              style={[
                styles.nameText,
                {fontSize: responsive(15), color: AppColor.red},
              ]}>
              {item.Menu.Name}
            </Text>

            <Text numberOfLines={numberOfLines} style={styles.descriptionText}>
              {item.Menu.Description}
            </Text>
            <Text
              style={{
                color: AppColor.green,
                fontSize: responsive(16),
                fontFamily: 'NotoSans-Medium',
              }}>
              Price: Rs. {item.Menu.Price}
            </Text>
          </View>

          <TouchableOpacity style={styles.iconHolder}>
            <Entypo
              name="dots-three-vertical"
              size={responsive(30)}
              color={AppColor.black}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonHolder}>
          {quantity > 0 ? (
            <View style={styles.conditionalButton}>
              <TouchableOpacity
                style={styles.plusHolder}
                onPress={() => handleMinusClick(item.Menu.Item_ID)}>
                <Text style={styles.plus}>-</Text>
              </TouchableOpacity>
              <View style={[styles.plusHolder, {width: '20%'}]}>
                <Text style={[styles.plus, {fontSize: responsive(16)}]}>
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.plusHolder}
                onPress={() => handlePlusClick(item.Menu.Item_ID)}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handlePlusClick(item.Menu.Item_ID)}
              style={styles.selectQty}>
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <CustomHeader title="Restaurant List" />
      <UpperHeader />
      <HomeSearch
        placeholder={'Search “Rajma Chawal near you”'}
        value={searchText}
        onChange={text => setSearchText(text)}
      />
      <View style={styles.contentHolder}>
        <Text style={styles.text2}>
          {item1?.name} - {item1?.type}
        </Text>
      </View>
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.Restaurant_ID.toString()}
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

export default AuthenticRestaurantList;

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
    fontSize: responsive(14),
    color: AppColor.white,
    textAlign: 'center',
    padding: responsive(5),
  },
  renderItem: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsive(5),
    borderRadius: responsive(5),
    backgroundColor: AppColor.white,
    elevation: responsive(5),
  },
  itemHolder: {
    flexDirection: 'row',
    padding: responsive(10),
  },
  imageHolder: {
    width: '25%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: responsive(150),
    borderRadius: responsive(10),
  },
  detailsHolder: {
    width: '65%',
    gap: responsive(5),
    padding: responsive(5),
  },
  nameText: {
    fontFamily: 'NotoSans-Bold',
    color: AppColor.green,
    fontSize: responsive(16),
    letterSpacing: 1,
  },
  descriptionText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(14),
    // textAlign: 'justify',
  },
  iconHolder: {
    width: '10%',
  },
  buttonHolder: {
    width: '35%',
    alignSelf: 'flex-end',
    marginRight: responsive(25),
    marginBottom: responsive(10),
    backgroundColor: AppColor.yellow,
    borderRadius: responsive(10),
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
  plusHolder: {
    width: '35%',
    padding: responsive(5),
    alignItems: 'center',
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
});
