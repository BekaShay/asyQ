import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RowView = ({children, style, ...props}) => {
  return (
    <View style={[styles.view,style]}>
        {children}
    </View>
  )
}

export default RowView

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
    }
})