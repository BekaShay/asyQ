import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getObject, removeStorage } from '../storage/AsyncStorage';
import { APP_STORAGE } from '../constants/const';
import FormTitle from '../components/FormTitle';
import { strings } from '../localization/localization';
import { APP_COLORS } from '../constants/colors';
import { data } from '../data/MainData';
import PrimaryButton from '../components/PrimaryButton';
import { IconSetting } from '../assets/icons/icons';
import { APP_ROUTES } from '../constants/routes';

const ProfileScreen = ({ navigation }) => {
    const [profileData, setProfileDate] = useState(null);

    useEffect(() => {
        (async () => {
            const profile = await getObject(APP_STORAGE.userProfile);
            setProfileDate(profile);
        })();
    }, [])

    const RefreshData = () => {
        removeStorage(APP_STORAGE.userProfile);
        navigation.replace(APP_ROUTES.SPLASH_SCREEN);
    }

    const EditProfile = () => {
        navigation.navigate(APP_ROUTES.EDIT_PROFILE_SCREEN)
    }

    return (
        <View style={styles.view}>
            <View style={styles.card1}>
                <TouchableOpacity style={styles.editProfile} onPress={EditProfile}><IconSetting /></TouchableOpacity>
                <FormTitle logo title={profileData?.name} text={strings['Возраст'] + ': ' + profileData?.age} />
            </View>
            <View style={styles.card2}>
                <FormTitle title='Progress' />
                <Text>Cards</Text>
                <View style={styles.line}>
                    <View
                        style={{
                            backgroundColor: APP_COLORS.PRIMARY_COLOR,
                            width: `${(profileData?.card.length / data.length) * 100}%`,
                        }} />
                </View>
            </View>
            <View style={styles.card3}>
                <FormTitle title={strings['Настройки']} />
                <PrimaryButton style={styles.refreshButton} text='Сброс данных' onPress={RefreshData} />
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    card1: {
        backgroundColor: APP_COLORS.PRIMARY_COLOR + '30',
        margin: 12,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: APP_COLORS.PRIMARY_COLOR,
    },
    card2: {
        margin: 12,
        padding: 16,
        paddingBottom: 24,
        backgroundColor: APP_COLORS.BACKGROUND,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: APP_COLORS.PRIMARY_COLOR + "30",
    },
    card3: {
        margin: 12,
        padding: 16,
        paddingBottom: 24,
        backgroundColor: APP_COLORS.BACKGROUND,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: APP_COLORS.PRIMARY_COLOR + "30",
    },
    editProfile: {
        alignSelf: 'flex-end',
    },
    line: {
        height: 3,
        width: "100%",
        backgroundColor: APP_COLORS.BORDER,
        flexDirection: 'row',
    },
    refreshButton: {
        marginVertical: 12,
        backgroundColor: APP_COLORS.WRONG,
    },
})