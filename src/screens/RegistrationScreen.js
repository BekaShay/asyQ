import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input'
import PrimaryButton from '../components/PrimaryButton'
import FormTitle from '../components/FormTitle'
import { strings } from '../localization/localization'
import { APP_ROUTES } from '../constants/routes'
import { getObject, storeObject } from '../storage/AsyncStorage'
import { APP_STORAGE } from '../constants/const'
import { data } from '../data/auth/data'
import { setFontStyles } from '../utils/setFontStyle'
import { APP_COLORS } from '../constants/colors'
import SelectList from '../components/SelectList'

const RegistrationScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [period, setPeriod] = useState('');

  const [error, setError] = useState(false);

  const errorText = () => {
    if (!name || !target || !period) {
      return strings['Вы не заполнили поля'];
    }
    else {
      return strings['Ошибка'];
    }
  };

  

  const onPressRegister = async () => {
    if (name) {
      let userData = {
        name: name,
        target: target,
        period: period,
        card: [],
      }
      let userProgress = {
        themes: [],
        words: [],
      };
      await storeObject(APP_STORAGE.userProfile, userData);
      await storeObject(APP_STORAGE.userProgress, userProgress);
      navigation.replace(APP_ROUTES.BOTTOM_TAB);
    }
    else {
      setError(true);
    }
  }
  return (
    <View style={styles.view}>
      <FormTitle logo title={strings['Регистрация']} style={styles.title} />
      <Input style={styles.inputs} title={strings['Имя']} placeholder={strings['Имя']} value={name} getValue={setName} />
      <SelectList style={styles.selector} placeHolder={strings['Цель по тематике']} data={data.targets} value={target} setValue={setTarget} />
      <SelectList style={styles.selector} placeHolder={strings['Цель по времени']} data={data.periods} value={period} setValue={setPeriod} />
      {error ? <Text style={styles.error}>{errorText()}</Text> : null}
      <PrimaryButton text={strings['Регистрация']} onPress={onPressRegister} />
    </View>
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
  view: {
    margin: 16,
    marginTop: 48,
  },
  title: {
    marginBottom: 24,
  },
  inputs: {
    marginBottom: 16,
  },
  button: {

  },
  error: {
    marginBottom: 16,
    ...setFontStyles(16, '400', APP_COLORS.TEXT_COLOR_GRAY),
  },
  selector: {
    marginBottom: 12,
  },
})