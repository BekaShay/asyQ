import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { setFontStyles } from '../utils/setFontStyle'
import { APP_ROUTES } from '../constants/routes';
import AppLogo from '../components/AppLogo';
import { APP_CONST, APP_STORAGE } from '../constants/const';
import { APP_COLORS } from '../constants/colors';
import { getObject } from '../storage/AsyncStorage';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        (async () => {
            const data = await getObject(APP_STORAGE.userProfile)
            setTimeout(() => {
                console.log("Init profile", data);
                if (data) {
                    navigation.replace(APP_ROUTES.BOTTOM_TAB);
                }
                else {
                    navigation.replace(APP_ROUTES.REGISTRATION_SCREEN);
                }
            }, 1500)
        })();
    }, [])

    return (
        <View style={styles.view}>
            <AppLogo style={styles.image} />
            <Text style={styles.text}>{APP_CONST.APP_NAME}</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 16,
    },
    text: {
        ...setFontStyles(32, '700', APP_COLORS.PRIMARY_COLOR),
    },
})