import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input';
import FormTitle from '../components/FormTitle';
import { strings } from '../localization/localization';
import { APP_COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import { getObject, storeObject } from '../storage/AsyncStorage';
import { APP_STORAGE } from '../constants/const';
import { APP_ROUTES } from '../constants/routes';

const EditProfileScreen = ({ navigation }) => {
    const [name, setName] = useState('');

    const onPressSave = async () => {
        let prevProfile = await getObject(APP_STORAGE.userProfile);
        let userData = {
            ...prevProfile,
            name: name ? name : prevProfile.name,
        }
        await storeObject(APP_STORAGE.userProfile, userData);
        navigation.replace(APP_ROUTES.BOTTOM_TAB);
    }

    return (
        <View style={styles.view}>
            <View style={styles.card}>
                <FormTitle logo title={strings['Редактировать профиль']} style={styles.title} />
                <Input style={styles.inputs} title={strings['Имя']} placeholder={strings['Имя']} value={name} getValue={setName} />
                <PrimaryButton text={strings['Сохранить']} onPress={onPressSave} />
            </View>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: APP_COLORS.BACKGROUND,
        paddingHorizontal: 12,
        paddingVertical: 24,
        borderRadius: 24,
    },
    inputs: {
        marginBottom: 16,
    },
    button: {

    },
    title: {
        marginBottom: 12,
    },
})