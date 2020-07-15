import {Toast} from 'native-base';
import {Alert} from 'react-native';
class ViewUtils {
  static showToast(text: any, buttonText = 'Okay', duration = 4000, buttonCallback = () => {}) {
    Toast.show({
      text: JSON.stringify(text),
      position: 'top',
      buttonText,
      duration,
      onClose: (reason) => {
        if (reason == 'user') {
          if (buttonCallback) {
            buttonCallback();
          }
        }
      }
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
