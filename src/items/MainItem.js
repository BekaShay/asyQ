import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WIDTH } from '../utils/screenDimensions'
import { APP_COLORS } from '../constants/colors'
import { setFontStyles } from '../utils/setFontStyle'

const MainItem = ({ onPress = () => undefined, data }) => {
    return (
        <TouchableOpacity style={styles.view} onPress={onPress}>
            <Image style={styles.image} source={{uri: data?.image}}/>
            <View style={styles.textView}>
                <Text style={styles.title}>{data?.theme}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MainItem

const styles = StyleSheet.create({
    view: {
        width: WIDTH / 2 - 32,
        height: WIDTH / 2 - 32,
        borderRadius: 16,
        backgroundColor: APP_COLORS.PRIMARY_COLOR + '55',
        margin: 8,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
    },
    textView: {
        backgroundColor: APP_COLORS.PRIMARY_COLOR,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignItems: 'center',
    },
    title: {
        ...setFontStyles(16, '500', APP_COLORS.TEXT_COLOR_WHITE),
        textAlign: 'center',
    },
})