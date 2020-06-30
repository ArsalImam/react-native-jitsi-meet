import {Toast} from 'native-base';
import {Alert} from 'react-native';
class ViewUtils {
  static showToast(text: any) {
    Toast.show({
      text: JSON.stringify(text),
      position: 'top',
      buttonText: 'Okay',
      duration: 3000,
    });
  }

  static showAlert(
    msg,
    okClick,
    cancelClick = null,
    okText = 'Ok',
    title = 'Telemedicine',
  ) {
    let cancel = null;
    if (cancelClick) {
      cancel = {
        text: 'Cancel',
        onPress: cancelClick,
        style: 'cancel',
      };
    }

    Alert.alert(title, msg, [cancel, {text: okText, onPress: okClick}], {
      cancelable: false,
    });
  }
}

export {ViewUtils};
