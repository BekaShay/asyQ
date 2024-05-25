import React, { useEffect, useRef, useState } from 'react';
import FormTitle from '../components/FormTitle';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { strings } from '../localization/localization';
import { APP_COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import CharacterLimitInput from '../components/CharacterLimitInput';
import { setFontStyles } from '../utils/setFontStyle';
import { APP_ROUTES } from '../constants/routes';
import { getObject, storeObject } from '../storage/AsyncStorage';
import { APP_STORAGE } from '../constants/const';
import ToastMessage from '../components/ToastMessage';

const EnterTextTest = ({ navigation, route }) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [resetInput, setResetInput] = useState(false);
    const data = route?.params;
    const [repeatWords, setRepeatWords] = useState([]); //repeat words

    useEffect(() => {

    }, [])

    const setResultInStorage = async () => { //save data in storage
        const response = await getObject(APP_STORAGE.userProfile);
        const params = {
            ...response,
            card: [
                data?.id,
                ...(response.card || []).filter(item => item !== data?.id) // Убираем старое значение, если оно уже есть
            ],
            repeat: [
                { themeId: data?.id, cardsId: repeatWords },
                ...(response.repeat || []).filter(item => item.themeId !== data?.id) // Убираем старое значение, если оно уже есть
            ]
        };
        console.log('newData', params);
        await storeObject(APP_STORAGE.userProfile, params);
        navigation.replace(APP_ROUTES.BOTTOM_TAB)
    }

    const setProgress = async () => {
        const response = await getObject(APP_STORAGE.userProgress);
        const currentTime = new Date();
        const params = {
            ...response,
            words: [
                {
                    themeId: data?.id,
                    wordCount: data?.card?.length - repeatWords.length,
                    date: currentTime.toLocaleDateString(),
                },
                ...(response?.words || []).filter(word => word && word?.themeId !== data?.id), // Удаляем старый элемент с тем же themeId
            ],
        };
        console.log("12");
        console.log("setProgress/data", params);
        await storeObject(APP_STORAGE.userProgress, params);
    }


    const onPress = () => { //onPress check
        console.log('onPress', text.toLowerCase, data?.card[index]?.question?.toLowerCase);
        if (text.toLowerCase() == data?.card[index]?.question?.toLowerCase()) {
            if (index < data?.card.length - 1) {
                console.log("1");
                setIndex(index + 1);
                setText(null);
                setResetInput(!resetInput);
                ToastMessage(text1 = strings['Правильно'], type = "success", time = 8000);
            }
            else { // finish test
                console.log("2");
                setText(null);
                setResetInput(!resetInput);
                ToastMessage(text1 = strings['Правильно'], type = "success", time = 8000);
                setProgress();
                setResultInStorage();
            }
        }
        else { //error test
            let temp = '';
            for (let i = 0; i < text?.length; i++) { //error symbols
                if (text?.toLowerCase()[i] != data?.card[index]?.question?.toLowerCase()[i]) {
                    temp += text?.toLowerCase()[i];
                }
            }
            setText(null);
            setResetInput(!resetInput);

            ToastMessage(text1 = strings['Ошибка'] + " 🔴 " + strings['Попробуйте снова'] + ". " + strings["Неправильные буквы"] + ": " + temp, type = "error", time = 8000);
            setErrorCount(prev => prev + 1)
            setRepeatWords(prev => {
                const newItem = data?.card[index]?.id;
                const existingIndex = prev.findIndex(item => item === newItem);

                if (existingIndex !== -1) {
                    return prev.map((item, idx) => (idx === existingIndex ? newItem : item));
                } else {
                    return [...prev, newItem];
                }
            });
        }
    }
    const onPressIdontKnow = () => {
        setIndex(index + 1);
        setErrorCount(prev => prev + 1)
        setRepeatWords(prev => {
            const newItem = data?.card[index]?.id;
            const existingIndex = prev.findIndex(item => item === newItem);

            if (existingIndex !== -1) {
                return prev.map((item, idx) => (idx === existingIndex ? newItem : item));
            } else {
                return [...prev, newItem];
            }
        });
        setText(null);
        setResetInput(!resetInput);
        if (index == data?.card.length - 1) {
            setResultInStorage();
        }
    }

    return (
        <View style={styles.view}>
            <FormTitle title={strings['Угадай слово']} text={strings['Напишите перевод слова внизу']} />
            <Text style={styles.text}>{data?.card[index]?.answer}</Text>
            <CharacterLimitInput
                limit={data?.card[index]?.question?.length}
                value={text}
                setValue={setText}
                resetAction={resetInput}
            />
            <PrimaryButton
                text={strings['Проверить']}
                onPress={onPress} />
            {index == data?.card.length - 1 ? null :
                <PrimaryButton
                    text={strings['Я не знаю ответа']}
                    style={{ marginTop: 12 }}
                    onPress={onPressIdontKnow} />}
        </View>
    );
};

export default EnterTextTest;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 16,
        paddingTop: 24,
        backgroundColor: APP_COLORS.BACKGROUND
    },
    input: {
        marginBottom: 16,
    },
    text: {
        ...setFontStyles(28, '700', APP_COLORS.TEXT_COLOR),
        alignSelf: 'center',
        marginVertical: 16,
        textDecorationLine: 'underline',
    },
})