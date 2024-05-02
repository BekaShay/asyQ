import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../components/PrimaryButton';
import { APP_COLORS } from '../constants/colors';
import { WIDTH } from '../utils/screenDimensions';
import FormTitle from '../components/FormTitle';
import { strings } from '../localization/localization';

const TestScreens = ({ navigation, route }) => {
    const data = route?.params;

    useEffect(() => {
        navigation.setOptions({
            title: data?.theme,
            headerLeft: null,
        });
    }, [])


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    useEffect(() => {
        if (currentQuestion === questions.length - 1) {
            setIsLastQuestion(true);
        } else {
            setIsLastQuestion(false);
        }
    }, [currentQuestion]);
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: 'What is the capital of France?',
            options: ['London', 'Paris', 'Berlin', 'Rome'],
            correctAnswer: 'Paris',
            isRight: false,
            isAnswered: false,
        },
        {
            id: 2,
            question: 'Which planet is known as the Red Planet?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
            correctAnswer: 'Mars',
            isRight: false,
            isAnswered: false,
        },
        // Add more questions as needed
    ]);

    const handleAnswer = (selectedOption) => {
        const updatedQuestions = [...questions];
        const currentQuestionObj = updatedQuestions[currentQuestion];

        if (currentQuestionObj.correctAnswer === selectedOption) {
            currentQuestionObj.isRight = true;
        } else {
            currentQuestionObj.isRight = false;
        }

        currentQuestionObj.isAnswered = true;

        setQuestions(updatedQuestions);
    };

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const renderAnswers = ({ item }) => {
        return <PrimaryButton
        style={[styles.answer, questions[currentQuestion].isAnswered ? item == questions[currentQuestion]?.correctAnswer ? styles.right : styles.wrong : null]}
        text={item}
            onPress={() => handleAnswer(item)}
            disabled={questions[currentQuestion].isAnswered}
        />
    }

    const onPressEndTest = () => {
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <FormTitle style={styles.question} title={strings['Вопрос'] + ": " + (currentQuestion + 1)} text={questions[currentQuestion].question} />
                <FlatList
                    data={questions[currentQuestion].options}
                    renderItem={renderAnswers}
                    numColumns={2}
                />
                <View style={styles.buttonContainer}>
                    {currentQuestion > 0 && (
                        <PrimaryButton
                            text={strings['Назад']}
                            onPress={handlePreviousQuestion}
                        />
                    )}
                    {isLastQuestion ? (
                        <PrimaryButton
                            text={strings['Завершить тест']}
                            onPress={onPressEndTest}
                        />
                    ) : (
                        <PrimaryButton
                            text={strings['Следующее']}
                            onPress={handleNextQuestion}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: APP_COLORS.BACKGROUND
    },
    view: {
        width: WIDTH - 16,
        backgroundColor: APP_COLORS.PRIMARY_COLOR + "20",
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 32,

    },
    question: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    answer: {
        width: WIDTH / 2 - 32,
        marginHorizontal: 4,
        marginVertical: 4,
        backgroundColor: APP_COLORS.PRIMARY_COLOR
    },
    right: {
        backgroundColor: APP_COLORS.RIGHT
    },
    wrong: {
        backgroundColor: APP_COLORS.WRONG
    }
});

export default TestScreens;
