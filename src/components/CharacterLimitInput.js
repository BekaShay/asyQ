import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { setFontStyles } from '../utils/setFontStyle';
import { APP_COLORS } from '../constants/colors';

const CharacterLimitInput = ({ limit, value, setValue, resetAction }) => {
    const [inputValue, setInputValue] = useState(value || '');
    const inputRef = useRef(null);

    const onChangeText = (text) => {
        if (text.length <= limit) {
            setInputValue(text);
            setValue(text);
        }
    };

    useEffect(() => {
        setInputValue('');
        setValue('');
        inputRef.current.blur();
    }, [resetAction])

    const handleCellPress = () => {
        inputRef.current.focus();
    };

    const renderCells = () => {
        const cells = [];
        for (let i = 0; i < limit; i++) {
            let char = inputValue[i] || '';
            cells.push(
                <TouchableOpacity
                    style={styles.cell}
                    key={i}
                    onPress={handleCellPress}
                >
                    <Text style={styles.cellText}>{char}</Text>
                </TouchableOpacity>
            );
        }
        return cells;
    };

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                value={inputValue}
                onChangeText={onChangeText}
                maxLength={limit}
            />
            <View style={styles.cellsContainer}>{renderCells()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0,
    },
    cellsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 40,
    },
    cell: {
        borderWidth: 1,
        borderColor: APP_COLORS.PRIMARY_COLOR,
        width: 32,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        backgroundColor: APP_COLORS.PRIMARY_COLOR + 90,
        borderRadius: 4,
    },
    cellText: {
        fontSize: 20,
        ...setFontStyles(16, '500', APP_COLORS.TEXT_COLOR_WHITE),
    },
});

export default CharacterLimitInput;
