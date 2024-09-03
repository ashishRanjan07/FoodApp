import Toast from 'react-native-toast-message';

export const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    position: 'top',
    text1,
    text2,
    visibilityTime: 3000, 
    autoHide: true,
  });
};