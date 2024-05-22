import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { data } from '../data/MainData'
import MainItem from '../items/MainItem'
import { strings } from '../localization/localization'
import { setFontStyles } from '../utils/setFontStyle'
import { IconCards } from '../assets/icons/icons'
import { APP_ROUTES } from '../constants/routes'
import { APP_STORAGE } from '../constants/const'
import { getObject } from '../storage/AsyncStorage'

const MainScreen = ({ navigation }) => {

  const [filteredData, setFilteredData] = useState();

  useEffect(async () => {
    const profile = await getObject(APP_STORAGE.userProfile);
    setFilteredData(data.filter(item => item.targets.includes(profile?.target)));
  }, [])

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
      {filteredData ? <>
        <PathTitle logo={<IconCards />} title={strings['Рекомендованные']} />
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          horizontal
          showsHorizontalScrollIndicator={false}
        /></> : null}
      <PathTitle logo={<IconCards />} title={strings['Темы']} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        numColumns={2}
        showsVerticalScrollIndicator={false}
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
  },
  pathTitle: {
    marginLeft: 12,
    ...setFontStyles(24, '500'),
  }
})