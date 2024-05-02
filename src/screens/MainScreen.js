import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { data } from '../data/MainData'
import MainItem from '../items/MainItem'
import { strings } from '../localization/localization'
import { setFontStyles } from '../utils/setFontStyle'
import { IconCards } from '../assets/icons/icons'
import { APP_ROUTES } from '../constants/routes'

const MainScreen = ({ navigation }) => {

  const renderItem = ({ item, id }) => {

    const onPress = () => {
      navigation.navigate(APP_ROUTES.CARD_SCREEM, item);
    };

    return <MainItem key={id} onPress={onPress} data={item} />
  };

  const PathTitle = ({ logo, title = 'title' }) => {
    return <View style={styles.pathView}>
      {logo ? logo : null}
      <Text style={styles.pathTitle}>{title}</Text>
    </View>
  }

  return (
    <View style={styles.view}>
      <PathTitle logo={<IconCards />} title={strings['Темы']} />
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },

  //PathTitle
  pathView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 16,
  },
  pathTitle: {
    marginLeft: 12,
    ...setFontStyles(24, '500'),
  }
})