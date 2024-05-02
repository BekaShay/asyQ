import {Platform, StyleSheet} from 'react-native';
import { APP_COLORS } from '../constants/colors';

export const setFontStyles = (
  fontSize = 16,
  fontWeight = '400',
  color = APP_COLORS.TEXT_COLOR,
  lineHeight = fontSize + 3,
) => {
  return StyleSheet.create({
    font: {
      fontSize,
      fontWeight,
      color,
      lineHeight,
    },
  }).font;
};
