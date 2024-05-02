import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import RowView from './RowView';
import { APP_COLORS } from '../constants/colors';
import { HEIGHT, WIDTH } from '../utils/screenDimensions';
import { IconArrowDown, IconClose } from '../assets/icons/icons';
import { setFontStyles } from '../utils/setFontStyle';

const SelectList = ({
    data,
    setValue,
    value,
    placeHolder = 'SelectList',
    style
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onPressItem = ({ item }) => {
        setValue(item);
        setModalVisible(false);
    }

    const renderItem = useCallback(({ item, index }) => {
        return <TouchableOpacity key={index} style={styles.itemView} onPress={() => onPressItem(item = { item })}>
            <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
    },)

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                }}>
                <View style={styles.modalView}>
                    <View style={styles.modalCard}>
                        <RowView style={styles.modalRow}>
                            <Text style={styles.modalTitle}>{placeHolder}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <IconClose />
                            </TouchableOpacity>
                        </RowView>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </Modal>
            <Text style={styles.selectorTitle}>{placeHolder}</Text>
            <TouchableOpacity style={[styles.selectionView, style]} onPress={() => setModalVisible(true)}>
                <Text style={value ? styles.selectionTextActive : styles.selectionTextInActive}>
                    {value ? value : placeHolder}
                </Text>
                <IconArrowDown />
            </TouchableOpacity>
        </>
    )
}

export default SelectList

const styles = StyleSheet.create({
    //modal
    modalView: {
        flex: 1,
        backgroundColor: '#00000050',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        backgroundColor: APP_COLORS.BACKGROUND,
        width: WIDTH / 1.2,
        maxHeight: HEIGHT / 1.2,
        padding: 16,
        borderRadius: 12,
    },
    modalRow: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    modalTitle: {
        ...setFontStyles(24, '500'),
        marginLeft: 24,
    },

    //Select
    selectionView: {
        borderRadius: 12,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectionTextInActive: {
        ...setFontStyles(16, '400', APP_COLORS.TEXT_COLOR_GRAY),
    },
    selectionTextActive: {
        ...setFontStyles(16, '400', APP_COLORS.TEXT_COLOR),
    },
    selectorTitle: {
        ...setFontStyles(),
        marginBottom: 8,
    },

    //Flatlist item
    itemView: {
        width: '100%',
        // backgroundColor: 'red',
        padding: 8,
        borderWidth: 0.2,
        borderColor: APP_COLORS.BORDER,
        alignItems: 'center',
    },
    itemText: {
        ...setFontStyles(18, '400', APP_COLORS.TEXT_COLOR),
    },
})