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
      <Text
        style={
          styles.text
        }>{`Your are ordering food for ${item?.name} in ${item?.type}`}</Text>
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
        selectedDayColor={AppColor.blue}
        selectedDayStyle={{backgroundColor: 'transparent'}}
        selectedDayTextColor={AppColor.red}
        selectedDayTextStyle={{
          fontFamily: 'NotoSans-Medium',
          fontSize: responsive(20),
        }}
        // allowRangeSelection={true}
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
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(18),
    color: AppColor.success,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: responsive(10),
  },
});
