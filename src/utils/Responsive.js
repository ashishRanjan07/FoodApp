import { Dimensions } from 'react-native'
export const responsive = (value, baseWidthPercentage = 100) => {
    const screenWidth = Dimensions.get('window').width;
    const baseWidth = (baseWidthPercentage / 100) * screenWidth;
    const scale = screenWidth / baseWidth;
    const responsiveSize = value * scale;
    return responsiveSize;
  };