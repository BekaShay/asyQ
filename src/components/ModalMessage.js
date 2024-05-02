import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WIDTH } from '../utils/screenDimensions';
import { APP_COLORS } from '../constants/colors';

const ModalMessage = ({ children, setValue, value, time = 750 }) => {
    useEffect(() => {
        setTimeout(() => {
            setValue(0);
        }, time)
    }, [value])
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={value?true:false}
            >
                <View style={styles.modal}>
                    <View style={styles.view}>
                        {children}
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ModalMessage

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    view: {
        height: 140,
        width: WIDTH,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: APP_COLORS.BORDER
    },
})