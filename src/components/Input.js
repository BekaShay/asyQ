import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import { APP_COLORS } from '../constants/colors';
import { setFontStyles } from '../utils/setFontStyle';

const Input = ({
  getValue = () => undefined,
  value,
  placeholder = 'placeholder',
  title = 'Title',
  style,
}) => {
  const [focus, setFocus] = useState(false);
  const onChangeText = value => {
    getValue(value);
  };
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          styles.input,
          {
            borderColor: focus ? APP_COLORS.PRIMARY_COLOR : null,
            borderWidth: focus ? 1 : 0,
          },
          style,
        ]}
        placeholderTextColor={APP_COLORS.TEXT_COLOR_GRAY}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...setFontStyles(),
  },
  title: {
    ...setFontStyles(),
    marginBottom: 8,
  },
});
