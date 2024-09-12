import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';
import {ImagePath} from '../../utils/ImagePath';
import UpperHeader from '../../components/Home/UpperHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeSearch from '../../components/Home/HomeSearch';
import foodCategories from '../../assets/json/Category';
import TopCategory from '../../assets/json/TopCategory';
import {useNavigation} from '@react-navigation/native';
import HomeCard from '../../components/Home/HomeCard';
import Data from '../../assets/json/HomeCoockedFoodData.json';

const Home = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);
  // const visibleCategories = showAll
  //   ? foodCategories
  //   : foodCategories.slice(0, 4);

  // const renderItem = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       style={[styles.renderItem,{backgroundColor:item?.color}]}
  //       onPress={() => navigation.navigate('Calendar', {item: item})}>
  //       <View>
  //         <Image source={item?.image} resizeMode="cover" style={styles.image} />
  //       </View>
  //       <View style={{paddingHorizontal: responsive(5),padding:responsive(15)}}>
  //         <Text style={styles.nameText}>{item?.name}</Text>
  //         <Text style={styles.typeText}>{item?.type}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={AppColor.yellow} barStyle={'dark-content'} />
      <UpperHeader />
      <HomeSearch
        placeholder={'Search “Rajma Chawal near you”'}
        value={searchText}
        onchange={text => setSearchText(text)}
      />

      {/* <View style={styles.categoryHolder}>
          <View style={styles.headHolder}>
            <Text style={styles.text}>Category</Text>
            <TouchableOpacity onPress={() => setShowAll(!showAll)}>
              <Text style={[styles.text, {color: AppColor.blue}]}>
                {showAll ? 'Show Less' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            {visibleCategories.map(item => (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.id)}
                style={[
                  styles.catView,
                  {
                    backgroundColor:
                      selectedCategory === item?.id
                        ? AppColor.success
                        : AppColor.white,
                  },
                ]}
                key={item?.id}>
                <Image
                  source={item?.image}
                  resizeMode="contain"
                  style={styles.imageStyle}
                />
                <Text style={styles.text2}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
      <View style={styles.topCategory}>
        <Text style={styles.catText}>Top Category</Text>
        <ScrollView>
          <View style={styles.cardHolder}>
            <HomeCard
              name={'Home Cooked Food'}
              type={'Regular Meal Service'}
              color={AppColor.yellow}
              image={ImagePath.f1}
              handleAction={() =>
                navigation.navigate('Home Cocked Meal Services', {
                  item: Data,type:TopCategory[0]
                })
              }
            />
            <HomeCard
              name={'Authentic Specialties'}
              type={'Advance Ordering'}
              color={AppColor.green}
              image={ImagePath.f2}
              handleAction={() =>
                navigation.navigate('Calendar', {item: TopCategory[1]})
              }
            />
            <HomeCard
              name={'Weekend Party Order'}
              type={'Pre Order'}
              color={AppColor.green}
              image={ImagePath.f3}
              handleAction={() => console.log('Clicked')}
            />
            <HomeCard
              name={'Authentic from your home Country'}
              type={'Instant Order'}
              color={AppColor.yellow}
              image={ImagePath.f4}
              handleAction={() => console.log('Clicked')}
            />
            {/* <FlatList
            data={TopCategory}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          /> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  categoryHolder: {
    width: '100%',
    marginVertical: responsive(10),
    alignSelf: 'center',
    padding: responsive(10),
    gap: responsive(5),
  },
  text: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(16),
  },
  headHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  catView: {
    borderWidth: 2,
    alignItems: 'center',
    gap: responsive(5),
    padding: responsive(5),
    borderRadius: responsive(5),
    marginHorizontal: responsive(4),
    width: responsive(90),
    backgroundColor: AppColor.white,
    borderColor: AppColor.borderColor,
  },
  imageStyle: {
    width: responsive(50),
    height: responsive(50),
    borderRadius: responsive(25),
  },
  text2: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(12),
    textAlign: 'center',
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  topCategory: {
    marginVertical: responsive(10),
    width: '95%',
    alignSelf: 'center',
    backgroundColor: AppColor.white,
    flex: 1,
  },
  catText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
    paddingHorizontal: responsive(10),
    marginVertical: responsive(10),
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
  },
  image: {
    height: responsive(150),
    width: '100%',
  },
  nameText: {
    width: '100%',
    // height: responsive(25),
    color: AppColor.black,
    fontSize: responsive(16),
    fontFamily: 'NotoSans-Medium',
  },
  typeText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.red,
    fontSize: responsive(16),
  },
  cardHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
