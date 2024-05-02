import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { APP_COLORS } from '../constants/colors'
import { WIDTH } from '../utils/screenDimensions'

const AppLogo = ({ style }) => {
    let img = require('./../assets/images/logo.png');
    return (
        <Image style={[styles.view, style]} source={img}>
        </Image>
    )
}

export default AppLogo

const styles = StyleSheet.create({
    view: {
        backgroundColor: APP_COLORS.PRIMARY_COLOR,
        borderRadius: 32,
        width: WIDTH / 2,
        height: WIDTH / 2,
    }
})