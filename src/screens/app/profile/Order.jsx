import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
// import StarRating from 'react-native-star-rating-widget';
import React, {useState} from 'react';
import {AppColor} from '../../../utils/AppColor';
import CustomHeader from '../../../components/CustomHeader';
import HomeSearch from '../../../components/Home/HomeSearch';
import {responsive} from '../../../utils/Responsive';
import Data from '../../../assets/json/Order.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Rating} from 'react-native-ratings';

const Order = () => {
  const [searchText, setSearchText] = useState('');
  const [showOption, setShowOption] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const staticImageUrl = 'https://picsum.photos/200/300';

  const handleShowOption = async item => {
    console.log(item, 'Line 28');
    setSelectedItem(item?.id);
    setShowOption(!showOption);
  };
  const renderItem = ({item}) => {
    // console.log(item, 'Line 12');
    return (
      <View style={styles.renderItem}>
        <View style={styles.upperView}>
          <View style={styles.imageHolder}>
            <Image
              source={{uri: staticImageUrl}}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.headerHolder}>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            <Text style={styles.addressText}>{item.restaurantAddress}</Text>
          </View>
          <TouchableOpacity
            style={styles.iconHolder}
            onPress={() => handleShowOption(item)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              color={AppColor.black}
              size={responsive(30)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.middleView}>
          {item?.items.map((food, index) => (
            <View style={styles.mUpperView} key={index}>
              <View
                style={[
                  styles.typeIcon,
                  {
                    borderColor:
                      food?.type === 'veg' ? AppColor.green : AppColor.red,
                  },
                ]}>
                <View
                  style={[
                    styles.circleHolder,
                    {
                      backgroundColor:
                        food?.type === 'veg' ? AppColor.green : AppColor.red,
                    },
                  ]}
                />
              </View>
              <View style={styles.foodDetailsHolder}>
                <Text style={styles.quantity}>{food?.quantity} x </Text>
                <Text style={styles.name}>{food?.dishName}</Text>
              </View>
            </View>
          ))}

          <View style={styles.dotHolder} />
          <View style={styles.view}>
            <View style={{width: '75%'}}>
              <Text
                style={
                  styles.deliverText
                }>{`Order Deliver on ${item?.orderDate} `}</Text>
              <Text style={styles.deliverText}>{item?.status}</Text>
            </View>
            <View style={{width: '22%', alignItems: 'center'}}>
              <Text style={styles.priceText}>
                Rs.{item?.totalCost}
                {' >'}
              </Text>
            </View>
          </View>
          <View style={styles.dotHolder} />
          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.rateText}>Rate</Text>
              <View
                style={{
                  width: '78%',
                  overflow: 'hidden',
                }}>
               <Rating
          readonly={true}
          imageSize={30}
          startingValue={item?.rating}
          style={{paddingVertical: 10, backgroundColor: AppColor.white}}
        />
              </View>
            </View>
            <View style={{width: '30%'}}>
              <CustomButton
                title={'Reorder'}
                color={AppColor.green}
                textColor={AppColor.white}
                handleAction={() =>
                  console.log('clicked on the reorder Section')
                }
              />
            </View>
          </View>
        </View>
        {showOption && item.id === selectedItem && (
          <View style={styles.optionHolder}>
            <TouchableOpacity style={styles.listHolder}>
              <Ionicons
                name="share"
                size={responsive(30)}
                color={AppColor.black}
              />
              <Text style={styles.shareText}>Share Oder Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listHolder}>
              <Feather
                name="delete"
                size={responsive(30)}
                color={AppColor.black}
              />
              <Text style={styles.shareText}>Delete Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.yellow} />
      <CustomHeader title={'Order'} />
      <View
        style={{gap: responsive(10), marginVertical: responsive(20), flex: 1}}>
        <HomeSearch
          placeholder={'Search by restaurant or dish'}
          value={searchText}
          onchange={text => setSearchText(text)}
        />
        <View style={{flex: 1, marginTop: responsive(15)}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data.orderHistory}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  renderItem: {
    borderWidth: 2,
    marginVertical: responsive(5),
    width: '95%',
    alignSelf: 'center',
    borderRadius: responsive(10),
    backgroundColor: AppColor.light,
    elevation: responsive(10),
    borderColor: AppColor.borderColor,
    overflow: 'hidden',
  },
  upperView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
    padding: responsive(10),
  },
  image: {
    height: responsive(75),
    width: responsive(75),
    borderRadius: responsive(20),
  },
  restaurantName: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
  },
  addressText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.borderColor,
    fontSize: responsive(14),
  },
  imageHolder: {
    width: '20%',
    overflow: 'hidden',
  },
  headerHolder: {
    width: '60%',
    gap: responsive(5),
  },
  iconHolder: {
    width: '15%',
    alignItems: 'center',
  },
  middleView: {
    borderTopWidth: 2,
    backgroundColor: AppColor.white,
    padding: responsive(10),
    borderColor: AppColor.borderColor,
  },
  mUpperView: {
    // borderWidth: 2,
    padding: responsive(10),
    flexDirection: 'row',
    gap: responsive(5),
    alignItems: 'center',
  },
  typeIcon: {
    borderWidth: 2,
    width: responsive(30),
    height: responsive(30),
    borderRadius: responsive(5),
    borderColor: AppColor.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotIcon: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.green,
    fontSize: responsive(12),
    textAlign: 'center',
  },
  circleHolder: {
    alignSelf: 'center',
    width: responsive(10),
    height: responsive(10),
    borderRadius: responsive(5),
    backgroundColor: AppColor.green,
  },
  quantity: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.borderColor,
    fontSize: responsive(16),
  },
  name: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
  },
  foodDetailsHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(2),
  },
  dotHolder: {
    width: '100%',
    borderWidth: 0.7,
    borderStyle: 'dotted',
    color: AppColor.borderColor,
  },
  deliverText: {
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(14),
    color: AppColor.borderColor,
  },
  priceText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
  },
  rateText: {
    fontFamily: 'NotoSans-Bold',
    color: AppColor.black,
    fontSize: responsive(18),
  },
  view: {
    flexDirection: 'row',
    gap: responsive(10),
    padding: responsive(10),
    alignItems: 'center',
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive(10),
    justifyContent: 'space-between',
  },
  view3: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionHolder: {
    borderWidth: 2,
    position: 'absolute',
    width: '50%',
    padding: responsive(10),
    borderRadius: responsive(5),
    right: 10,
    top: 70,
    backgroundColor: AppColor.white,
    gap: responsive(10),
    elevation: responsive(10),
    borderColor: AppColor.light,
  },
  listHolder: {
    flexDirection: 'row',
    gap: responsive(10),
    alignItems: 'center',
  },
  shareText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(14),
  },
});
