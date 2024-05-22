import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Component = () => {
    let a = 1;
    let b = 3;
    let c;
    const [num, setNum] = useState(0);

    const onPressButton = () => {
        console.log("A + B =", a + b);
        setNum(a + b)
    }

    return <View style={styles.container}>
        <Text style={styles.text}>{num}</Text>
        <Button title='Enter' onPress={onPressButton}></Button>
    </View>
}

export default Component

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
    },
    text: {
        fontSize: 64
    }
})