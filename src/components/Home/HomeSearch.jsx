import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsive } from '../../utils/Responsive';
import { AppColor } from '../../utils/AppColor';

const HomeSearch = ({placeholder,value,onchange}) => {
    return (
      <View style={styles.searchBoxHolder}>
          <MaterialIcons
            name="search"
            size={responsive(30)}
            color={AppColor.borderColor}
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={AppColor.borderColor}
            value={value}
            onChangeText={onchange}
            keyboardType="default"
            style={styles.textInput}
          />
        </View>
    )
  }

export default HomeSearch

const styles = StyleSheet.create({searchBoxHolder: {
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    borderRadius: responsive(10),
    padding: responsive(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: AppColor.borderColor,
  },
  textInput: {
    width: '90%',
    paddingHorizontal: responsive(10),
    fontFamily: 'NotoSans-Medium',
    fontSize: responsive(16),
    color: AppColor.black,
  },
});