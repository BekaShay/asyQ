import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { setFontStyles } from '../utils/setFontStyle'
import { APP_COLORS } from '../constants/colors'

const PrimaryButton = ({ onPress = () => undefined, text = 'Enter', style, textStyle, disabled }) => {
    return (
        <TouchableOpacity style={[styles.view, style]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    view: {
        backgroundColor: APP_COLORS.PRIMARY_COLOR,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...setFontStyles(16, '700', APP_COLORS.TEXT_COLOR_WHITE),
    }
})