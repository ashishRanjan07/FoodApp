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
import React, {useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import {responsive} from '../../utils/Responsive';
import {ImagePath} from '../../utils/ImagePath';
import UpperHeader from '../../components/Home/UpperHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Search from '../../components/Home/Search';
import foodCategories from '../../assets/json/Category';
import TopCategory from '../../assets/json/TopCategory';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);
  console.log(TopCategory, 'Line 25');
  const visibleCategories = showAll
    ? foodCategories
    : foodCategories.slice(0, 4);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.renderItem}>
        <View>
          <Image source={item?.image} resizeMode='cover' style={styles.image}/>
        </View>
        <View style={{paddingHorizontal:responsive(5)}}>
        <Text style={styles.nameText}>{item?.name}</Text>
        <Text  style={styles.typeText}>{item?.type}</Text>
        </View>
        
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <UpperHeader />
      <Search
        placeholder={'Search “Rajma Chawal near you”'}
        value={searchText}
        onchange={text => setSearchText(text)}
      />
      <ScrollView>
      <View style={styles.categoryHolder}>
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
      </View>
      <View style={styles.topCategory}>
        <Text style={styles.catText}>Top Category</Text>
        <View style={{alignItems: 'center',flex:1}}>
          <FlatList
            data={TopCategory}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      </ScrollView>
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
    // borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: AppColor.white,
    // alignItems:'center',
    flex:1
  },
  catText: {
    fontFamily: 'NotoSans-Medium',
    color: AppColor.black,
    fontSize: responsive(18),
    paddingHorizontal: responsive(10),
  },
  renderItem: {
    borderWidth: 2,
    width: responsive(125),
    margin: responsive(5),
    backgroundColor: '#F8F6F4',
    borderRadius: responsive(10),
    overflow: 'hidden',
    borderColor: '#F8F6F4',
    gap:responsive(5)
  },
  image:{
    height:responsive(150),
    width:'100%'
  },
  nameText:{
    width:'100%',
    height:responsive(25),
    color:AppColor.black,
    fontSize:responsive(16),
    fontFamily:'NotoSans-Medium'
  },
  typeText:{
    fontFamily:'NotoSans-Medium',
    color:AppColor.red,
    fontSize:responsive(16),
  }
});
