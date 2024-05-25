import Toast from 'react-native-toast-message'

export default function ToastMessage(
    text1 = "Message",
    type = 'success',
    time = 1500,
) {
    Toast.show({
        type: type,
        text1: text1,
        autoHide: true,
        visibilityTime: time,
        position: 'bottom',
    });
}
