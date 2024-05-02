import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../components/PrimaryButton';
import { APP_COLORS } from '../constants/colors';
import { setFontStyles } from '../utils/setFontStyle';
import { APP_ROUTES } from '../constants/routes';
import { strings } from '../localization/localization';

const CardScreens = ({ navigation, route }) => {
    const data = route?.params;

    useEffect(() => {
        navigation.setOptions({
            title: data?.theme,
        });
    }, [])

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDefinition, setShowDefinition] = useState(false);

    const toggleDefinition = () => {
        setShowDefinition(!showDefinition);
    };

    const goToNextCard = () => {
        setShowDefinition(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.card.length);
    };

    const goToPreviousCard = () => {
        setShowDefinition(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data?.card.length) % data?.card.length);
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