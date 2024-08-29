import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColor } from '../../utils/AppColor'

const Pending = () => {
  return (
    <View style={styles.main}>
      <Text>Pending</Text>
    </View>
  )
}

export default Pending

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:AppColor.white
    }
})