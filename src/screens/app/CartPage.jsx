import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColor} from '../../utils/AppColor';
import CustomHeader from '../../components/CustomHeader';
import UpperHeader from '../../components/Home/UpperHeader';
import {ImagePath} from '../../utils/ImagePath';
import {responsive} from '../../utils/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';

const CartPage = ({route}) => {
  const staticImageUrl = 'https://picsum.photos/200/300';
  const {cartItems, item, date} = route.params;
  console.log(cartItems, 'Line 9');
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    const total = Object.values(cartItems).reduce((acc, currentItem) => {
      return acc + currentItem.quantity * parseInt(currentItem.Price);
    }, 0);
    setTotalPrice(total);
  };

  const renderItem = ({item}) => {
    console.log(item, 'Line 15');
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: staticImageUrl}}
            resizeMode="cover"
            style={styles.cartItemImage}
          />
        </View>
        <View style={styles.cartDetailsHolder}>
          <Text style={styles.itemName}>{item.Name}</Text>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.Description}
          </Text>
        </View>
        <View style={styles.priceHolder}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              gap: responsive(10),
            }}>
            <TouchableOpacity style={styles.plusHolder}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity style={styles.plusHolder}>
              <Text style={styles.plus}>-</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>
            Rs.{item.quantity * parseInt(item?.Price)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <CustomHeader title={'Cart'} />
      {/* Delivery Related Info */}
      <ScrollView>
        <View style={styles.upperHeaderHolder}>
          <View style={styles.textHolder}>
            <Text style={styles.nameText1}>
              Delivery from {item?.Restaurant_Name}{' '}
            </Text>
            <Text style={styles.nameText} numberOfLines={2}>
              Address:{item?.Address}
            </Text>
          </View>
          <View style={styles.imageHolder}>
            <Image
              source={ImagePath.user}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </View>
        </View>
        <View style={styles.detailsHolder}>
          <Text style={[styles.nameText, {color: AppColor.white}]}>
            Ordering for - {date} {'\n'} Pickup start {item?.time}
          </Text>
        </View>
        {/* Show list of item that have been selected in previous section */}
        <View style={styles.itemHolder}>
          <FlatList
            data={Object.values(cartItems)}
            renderItem={renderItem}
            keyExtractor={item => item.Item_ID.toString()}
          />
        </View>
        {/* Give the note to kitchen */}
        <View style={styles.kitchenNotes}>
          <MaterialCommunityIcons
            name="note-outline"
            color={AppColor.borderColor}
            size={responsive(30)}
          />
          <TextInput
            placeholder="Add a note for the kitchen"
            placeholderTextColor={AppColor.borderColor}
            value={notes}
            onChangeText={text => setNotes(text)}
            style={styles.textInput}
            keyboardType="default"
            multiline={true}
          />
        </View>
        {/* Button group */}
        <View
          style={[
            styles.kitchenNotes,
            {justifyContent: 'space-between', borderWidth: 0},
          ]}>
          <View style={{width: '45%'}}>
            <CustomButton
              title={'Delivery Mode Pickup'}
              color={AppColor.yellow}
              textColor={AppColor.white}
              handleAction={() =>
                console.log('CLicked on the delivery Mode Button')
              }
            />
          </View>

          <View style={{width: '45%'}}>
            <CustomButton
              title={`Order Now - Rs.${totalPrice}`}
              color={AppColor.success}
              textColor={AppColor.white}
              handleAction={() => console.log('Clicked on Order Now')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  upperHeaderHolder: {
    backgroundColor: AppColor.white,
    padding: responsive(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHolder: {
    padding: responsive(10),
    gap: responsive(5),
    width: '70%',
  },
  nameText1: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
    width: '100%',
  },
  nameText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
    textAlign: 'center',
    width: '100%',
  },
  imageStyle: {
    height: responsive(75),
    width: responsive(75),
  },
  imageHolder: {
    width: '30%',
    alignItems: 'center',
  },
  detailsHolder: {
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: responsive(5),
    padding: responsive(5),
    backgroundColor: AppColor.success,
    borderColor: AppColor.success,
  },
  itemHolder: {
    marginVertical: responsive(10),
    width: '95%',
    alignSelf: 'center',
    padding: responsive(10),
    borderRadius: responsive(5),
  },
  cartItemContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: responsive(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartItemInfo: {
    // flex: 1,
    // paddingRight: responsive(10),
  },
  itemName: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(16),
    color: AppColor.black,
  },
  itemDescription: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.gray,
    marginBottom: responsive(5),
  },
  quantityPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantity: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.black,
  },
  price: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.success,
  },
  cartItemImage: {
    height: responsive(80),
    width: responsive(80),
    borderRadius: responsive(10),
  },
  imageContainer: {
    width: '25%',
    alignItems: 'center',
  },
  cartDetailsHolder: {
    width: '50%',
    padding: responsive(10),
  },
  priceHolder: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: responsive(10),
  },
  plusHolder: {
    borderWidth: 2,
    paddingHorizontal: responsive(10),
    backgroundColor: AppColor.light,
    borderRadius: responsive(5),
    borderColor: AppColor.light,
  },
  plus: {
    color: AppColor.red,
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
  },
  kitchenNotes: {
    borderWidth: 2,
    marginVertical: responsive(10),
    width: '95%',
    alignSelf: 'center',
    borderRadius: responsive(10),
    borderColor: AppColor.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(15),
    paddingHorizontal: responsive(10),
  },
  textInput: {
    width: '90%',
    paddingHorizontal: responsive(10),
    color: AppColor.black,
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
  },
});
