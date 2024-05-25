import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { setFontStyles } from '../utils/setFontStyle';

const ProfileScreen = ({ navigation }) => {
    const [profileData, setProfileDate] = useState(null);

    const [progressDay, setProgressDay] = useState(0);
    const [progressMonth, setProgressMonth] = useState(0);
    const [progressYear, setProgressYear] = useState(0);

    useEffect(() => {
        (async () => {
            const profile = await getObject(APP_STORAGE.userProfile);
            console.log("ProfileData", profile);
            setProfileDate(profile);

            const progress = await getObject(APP_STORAGE.userProgress);
            console.log("prgoress response", progress);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // добавляем 1 и форматируем месяц
            const currentDay = ('0' + currentDate.getDate()).slice(-2); // форматируем день

            console.log("Today date", currentDay, currentMonth, currentYear);

            // Данные за сегодняшний день
            const progressForToday = await progress?.words?.filter(item => {
                return item?.date.split('.')[0] == currentDay;
            });
            console.log("progressForToday", progressForToday);
            setProgressDay(progressForToday.reduce((sum, item) => sum + item.wordCount, 0));

            // Данные за текущий месяц
            const progressForCurrentMonth = await progress?.words.filter(item => {
                return item?.date.split('.')[1] == currentMonth;
            });
            console.log("progressForCurrentMonth", progressForCurrentMonth);
            setProgressMonth(progressForCurrentMonth.reduce((sum, item) => sum + item.wordCount, 0));

            // Данные за текущий год
            const progressForCurrentYear = await progress?.words.filter(item => {
                return item?.date.split('.')[2] == currentYear;
            });
            console.log("progressForCurrentYear", progressForCurrentYear);
            setProgressYear(progressForCurrentYear.reduce((sum, item) => sum + item.wordCount, 0));
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
        <ScrollView style={styles.view}>
            <View style={styles.card1}>
                <TouchableOpacity style={styles.editProfile} onPress={EditProfile}><IconSetting /></TouchableOpacity>
                <FormTitle logo title={profileData?.name} text={strings['Цель'] + ': ' + profileData?.target} />
            </View>
            <View style={styles.card2}>
                <FormTitle title={strings['Прогресс']} text={strings['Темы'] + ": " + profileData?.card.length + " / " + data.length} />
                <View style={styles.line}>
                    <View
                        style={{
                            backgroundColor: APP_COLORS.PRIMARY_COLOR,
                            width: `${(profileData?.card.length / data.length) * 100}%`,
                        }} />
                </View>
                <Text style={styles.progressText}>{" • " + strings["Прогресс за День"] + " : " + progressDay + " " + strings["Слов"]}</Text>
                <Text style={styles.progressText}>{" • " + strings["Прогресс за Месяць"] + " : " + progressMonth + " " + strings["Слов"]}</Text>
                <Text style={styles.progressText}>{" • " + strings["Прогресс за Год"] + " : " + progressYear + " " + strings["Слов"]}</Text>
            </View>
            <View style={styles.card3}>
                <FormTitle title={strings['Настройки']} />
                <PrimaryButton style={styles.refreshButton} text='Сброс данных' onPress={RefreshData} />
            </View>
        </ScrollView>
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
        marginTop: 12,
        marginBottom: 10,
        height: 5,
        borderRadius: 2,
        width: "100%",
        backgroundColor: APP_COLORS.BORDER,
        flexDirection: 'row',
    },
    refreshButton: {
        marginVertical: 12,
        backgroundColor: APP_COLORS.WRONG,
    },
    progressText: {
        ...setFontStyles(16, '500', APP_COLORS.TEXT_COLOR_GRAY),
        marginTop: 12,
        marginLeft: 4,
    }
})