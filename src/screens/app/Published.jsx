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
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';
import {Rating} from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Published = ({route}) => {
  const {reviewData} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [initialValue, setInitialValue] = useState(0);
  const [selectedId, setSelectedId] = useState('');
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <View style={styles.renderItem}>
        <View style={styles.detailsHolder}>
          <View style={styles.imageHolder}>
            {isLoading && (
              <View style={styles.loaderView}>
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size={'large'} color={AppColor.yellow} />
                </View>
              </View>
            )}
            <Image
              source={{uri: item?.image}}
              resizeMode="cover"
              style={styles.imageStyle}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />
          </View>
          <View style={styles.contentHolder}>
            <Text style={styles.nameText}>{item?.name}</Text>
            <Text style={styles.descriptionText}>{item?.description}</Text>
          </View>
        </View>
        {/* Rating Star */}
        <Rating
          readonly={true}
          imageSize={30}
          startingValue={item?.rating}
          onFinishRating={text => {
            console.log(item?.id, 'Line 52');
            setInitialValue(text);
            setSelectedId(item?.id);
          }}
          style={{paddingVertical: 10, backgroundColor: AppColor.white}}
        />
        <View style={styles.buttonHolder}>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons
              name="delete"
              size={responsive(25)}
              color={AppColor.black}
            />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <MaterialIcons
              name="edit"
              size={responsive(25)}
              color={AppColor.black}
            />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={{flex: 1, marginVertical: responsive(10)}}>
        <FlatList
          data={reviewData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Published;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  renderItem: {
    width: '95%',
    borderWidth: 2,
    alignSelf: 'center',
    marginVertical: responsive(5),
    padding: responsive(10),
    borderRadius: responsive(10),
    backgroundColor: AppColor.light,
    borderColor: AppColor.light,
  },
  detailsHolder: {
    // borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive(10),
  },
  imageHolder: {
    backgroundColor: AppColor.white,
    width: '25%',
  },
  imageStyle: {
    height: responsive(100),
    width: responsive(100),
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
  contentHolder: {
    width: '70%',
    gap: responsive(5),
  },
  rateText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: responsive(14),
    color: AppColor.blue,
  },
  nameText: {
    fontSize: responsive(18),
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    width: '100%',
  },
  descriptionText: {
    fontFamily: 'NotoSans-Regular',
    fontSize: responsive(16),
    color: AppColor.borderColor,
  },
  buttonHolder: {
    marginVertical: responsive(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 1,
    borderRadius: responsive(10),
    borderColor: AppColor.borderColor,
    width: '45%',
    gap: responsive(5),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: responsive(10),
    backgroundColor: AppColor.borderColor,
    elevation: 10,
  },
  buttonText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
  },
});
