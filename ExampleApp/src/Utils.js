import { Toast } from "native-base";
class ViewUtils {
  static showToast (text: any) {
    Toast.show ({
      text: JSON.stringify(text),
      position: 'top',
      buttonText: 'Okay',
      duration: 3000,
    });
  }
}

export {ViewUtils};
