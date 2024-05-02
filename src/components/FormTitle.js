import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { setFontStyles } from '../utils/setFontStyle'
import { APP_COLORS } from '../constants/colors'
import AppLogo from './AppLogo'

const FormTitle = ({style, title = 'title', text, logo = false}) => {
  return (
    <View style={[styles.view, style]}>
      {logo?<AppLogo style={styles.logo}/>:null}
      <Text style={styles.title}>{title}</Text>
      {text?<Text style={styles.text}>{text}</Text>:null}
    </View>
  )
}

export default FormTitle

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
      marginBottom: 24,
    },
    title: {
        textAlign: 'center',
        ...setFontStyles(24, '700', APP_COLORS.TEXT_COLOR),
    },
    text: {
        textAlign: 'center',
        ...setFontStyles(16, '400', APP_COLORS.TEXT_COLOR_GRAY),
    },
})