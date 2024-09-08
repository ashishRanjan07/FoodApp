import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppColor} from '../../utils/AppColor';
import CustomHeader from '../../components/CustomHeader';
import CalendarPicker from 'react-native-calendar-picker';
import {responsive} from '../../utils/Responsive';
import CustomButton from '../../components/CustomButton';
import UpperHeader from '../../components/Home/UpperHeader';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const CalendarScreen = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params;
  const [date, setDate] = useState();
  const minDate = new Date();

  const handleSubmit = async () => {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const NewDate = formatDate.split('T')[0];
    console.log(NewDate, 'Line 21');
    setDate(NewDate);
    navigation.navigate('Restaurant List', {item: item, date: NewDate});
  };
  return (
    <View style={styles.main}>
      <CustomHeader title={'Select Date'} />
      <UpperHeader />
      <View style={styles.contentHolder}>
        <Text style={styles.text}>{` ${item?.name} - ${item?.type}`}</Text>
      </View>

      <CalendarPicker
        minDate={minDate}
        onDateChange={date1 => {
          console.log(date1, 'Line12');
          setDate(date1);
        }}
        firstDay={1}
        startFromMonday
        // showDayStragglers={true}
        previousTitleStyle={styles.dateStyle}
        nextTitleStyle={styles.dateStyle}
        selectedDayColor={'transparent'}
        selectedDayStyle={{backgroundColor: 'transparent'}}
        selectedDayTextColor={AppColor.red}
        selectedDayTextStyle={{
          fontFamily: 'NotoSans-Medium',
          fontSize: responsive(20),
        }}
        allowRangeSelection={true}
        todayBackgroundColor="#f2e6ff"
      />

      <View
        style={{
          width: '50%',
          marginVertical: responsive(10),
          alignSelf: 'flex-end',
          marginHorizontal: responsive(15),
        }}>
        <CustomButton
          title={'Submit'}
          color={AppColor.yellow}
          textColor={AppColor.white}
          handleAction={handleSubmit}
        />
      </View>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  dateStyle: {
    color: AppColor.black,
    fontSize: responsive(18),
    fontFamily: 'NotoSans-Medium',
  },
  text: {
    fontFamily: 'NotoSans-Bold',
    fontSize: responsive(16),
    color: AppColor.white,
    textAlign: 'center',
    padding: responsive(10),
  },
  contentHolder: {
    borderWidth: 2,
    backgroundColor: AppColor.red,
    borderColor: AppColor.red,
    width: '90%',
    borderRadius: responsive(20),
    alignSelf: 'center',
    marginVertical: responsive(10),
    elevation:responsive(10)
  },
});
