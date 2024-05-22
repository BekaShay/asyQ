import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../components/PrimaryButton';
import { APP_COLORS } from '../constants/colors';
import { setFontStyles } from '../utils/setFontStyle';
import { APP_ROUTES } from '../constants/routes';
import { strings } from '../localization/localization';
import ModalMessage from '../components/ModalMessage';
import FormTitle from '../components/FormTitle';

const CardScreens = ({ navigation, route }) => {
    const data = route?.params;
    const [count, setCount] = useState(1);
    const [message, setMessage] = useState(0);
    console.log(count);

    useEffect(() => {
        navigation.setOptions({
            title: data?.theme,
        });
        console.log("CardScreens/useEffect/data", data);
    }, [])

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDefinition, setShowDefinition] = useState(false);

    const toggleDefinition = () => {
        setShowDefinition(!showDefinition);
    };

    const getText = () => {
        if(count % 10 == 0 && count != 1 && count != 0) {
            return strings['Ты выучил 10 слов🎉'];
        }
        else if(count % 5 == 0 && count != 1 && count != 0) {
            return "Жарайсың👏🏻";
        }
        return "Жарайсың👏🏻";
    }

    const goToNextCard = () => {
        setShowDefinition(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.card.length);
        setCount(prev => prev + 1);
        if (count % 9 == 0 && count != 0) {
            setMessage(1);
        }
        else if( count % 5 == 0 && count != 0) {
            setMessage(1);
        }
    };

    const goToPreviousCard = () => {
        setShowDefinition(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data?.card.length) % data?.card.length);
        setCount(prev => prev - 1);
    };

    const goToTest = () => {
        navigation.replace(APP_ROUTES.SAME_CARD_SCREEN, data);
    }

    const isLastCard = currentIndex === data?.card.length - 1;
    const isFirstCard = currentIndex === 0;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={showDefinition ? styles.cardOpen : styles.cardClose} onPress={toggleDefinition}>
                <Text style={styles.text}>
                    {showDefinition ? data?.card[currentIndex].answer : data?.card[currentIndex].question}
                </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                {!isFirstCard && <PrimaryButton text={strings['Назад']} onPress={goToPreviousCard} />}
                {!isLastCard ? (
                    <PrimaryButton text={strings['Следующее слово']} onPress={goToNextCard} />
                ) : (
                    <PrimaryButton text={strings['Начать тест']} onPress={goToTest} />
                )}
            </View>
            <ModalMessage setValue={setMessage} value={message}>
                <FormTitle title={getText()} text={strings["Молодец"]} />
            </ModalMessage>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cardClose: {
        width: '80%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: APP_COLORS.PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: APP_COLORS.PRIMARY_COLOR + '70',
        padding: 20,
        marginBottom: 20,
    },
    cardOpen: {
        width: '80%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: '#9EEB7A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
    },
    text: {
        ...setFontStyles(24, '700', APP_COLORS.TEXT_COLOR_WHITE),
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CardScreens;