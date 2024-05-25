import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WIDTH } from '../utils/screenDimensions'
import { setFontStyles } from '../utils/setFontStyle'
import { APP_COLORS } from '../constants/colors'

const ToastView = ({ text, type = "success" }) => {
    return (
        <View style={[styles.container, { borderLeftColor: type == "success" ? APP_COLORS.PRIMARY_COLOR : "red" }]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default ToastView

const styles = StyleSheet.create({
    container: {
        width: WIDTH - 64,
        marginHorizontal: 24,
        marginBottom: -12,
        backgroundColor: '#f8f8f8',
        padding: 24,
        borderRadius: 12,
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderRightWidth: 0.2,
        borderTopColor: APP_COLORS.BORDER,
        borderBottomColor: APP_COLORS.BORDER,
        borderRightColor: APP_COLORS.BORDER,
        borderLeftWidth: 14,

    },
    text: {
        ...setFontStyles(24, '700', APP_COLORS.TEXT_COLOR),
    }
})