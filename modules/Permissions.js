import { PermissionsAndroid  } from 'react-native'

export const CameraPermission = async (callback) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callback(true)
      } else {
        callback(false)
      }
    } catch (err) {
      console.warn(err);
    }
  };