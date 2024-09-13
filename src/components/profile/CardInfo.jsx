import { StyleSheet, Text, View, ScrollView, } from 'react-native'
import React from 'react'
import Data from '../../assets/json/CardInfo.json';
import { responsive } from '../../utils/Responsive';
import { AppColor } from '../../utils/AppColor';

const CardInfo = () => {

    const renderItem = Item => {
        return (
          <View style={styles.cardHolder} key={Item.cardNumber}>
            <Text style={styles.cardText}>Card Number : {Item.cardNumber}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.text2}>
                Valid Till {Item?.expirationMonth}/{Item?.expirationYear}
              </Text>
              <Text style={styles.text2}>CVV {Item?.securityCode}</Text>
            </View>
            <Text style={[styles.text2, {textAlign: 'center'}]}>
              Card Provider {Item?.cardType}
            </Text>
          </View>
        );
      };
      
  return (
    <View style={styles.main}>
    <Text style={styles.text}>Saved Card</Text>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {Data.map(Item => renderItem(Item))}
    </ScrollView>
  </View>
  )
}

export default CardInfo

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: AppColor.white,
        elevation: responsive(10),
        width: '100%',
        borderRadius: responsive(5),
        padding: responsive(10),
      },
      text: {
        fontSize: responsive(22),
        color: 'blue',
        fontFamily: 'NotoSans-Medium',
        paddingHorizontal: responsive(10),
      },
      cardHolder: {
        borderWidth: 2,
        margin: responsive(10),
        borderRadius: responsive(10),
        padding: responsive(10),
        gap: responsive(5),
      },
      cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsive(10),
        justifyContent: 'space-evenly',
      },
      text2: {
        fontSize: responsive(18),
        color: AppColor.black,
        fontFamily: 'NotoSans-Medium',
      },
      cardText: {
        fontSize: responsive(20),
        color: AppColor.success,
        fontFamily: 'NotoSans-Medium',
      },
})