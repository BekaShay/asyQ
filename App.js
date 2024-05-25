import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { strings } from './src/localization/localization';
import { Text, View } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { APP_COLORS } from './src/constants/colors';
import { setFontStyles } from './src/utils/setFontStyle';
import ToastView from './src/components/ToastView';

const App = () => {

  strings.setLanguage('ru');

  const toastConfig = {
    success: ({ text1 = "message", text2 = "", props, ...rest }) => (
      <ToastView text={text1} type={'success'}/>
    ),
    error: ({ text1 = "message", text2 = "", props, ...rest }) => (
      <ToastView text={text1} type={'error'}/>
    ),
  };

  return (<>
    <RootNavigation />
    <Toast config={toastConfig} />
  </>
  );
};

export default App;