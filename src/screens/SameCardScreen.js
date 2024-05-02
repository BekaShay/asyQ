import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { strings } from '../localization/localization';
import { HEIGHT, WIDTH } from '../utils/screenDimensions';
import FormTitle from '../components/FormTitle';
import { data } from '../data/MainData';
import { APP_COLORS } from '../constants/colors';
import { setFontStyles } from '../utils/setFontStyle';
import ModalMessage from '../components/ModalMessage';

const SameCardScreen = ({ navigation, route }) => {
  //Таймер
  const cards = route?.params?.card;
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!timer && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, seconds]);

  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  const n = 4;
  const [cardLenght, setCardLenght] = useState(n);
  const [randomCards, setRandomCards] = useState();
  const [finishCard, setFinishCard] = useState([]);
  const [allCard, setAllCard] = useState([]);
  const [message, setMessage] = useState(0);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    createRandomData(cards);
    setTimer(true)
  }, [])
  useEffect(() => {
    if (finishCard.length == n * 2) {
      setFinishCard([]);
      createRandomData(cards);
      setMessage(1);
      setMessageText(strings['Правильно'])
    }
    else if (allCard.length / 2 == cards.length) { // Finish
      if (seconds < 25) {
        setMessageText(seconds + " " + strings['секунд 🎉. Жылдамдылық таныттың']);
      }
      else {
        setMessageText(seconds + " " + strings['секунд. Сен жылдамырақ жасай аласың!']);
      }
      setMessage(1);
      setTimer(false);
      Alert.alert("Finish")
    }
    console.log("\n---------> ", allCard.length / 2, cards.length, "\n");
  }, [allCard, finishCard])

  const createRandomData = (data) => {
    let myArray = [];
    let m = 0;
    for (let index = cardLenght - n; index < data?.length; index++) {

      myArray.push({
        index: m,
        id: data[index]?.id,
        question: data[index]?.question,
        answer: data[index]?.answer,
      });
      m++;
      myArray.push({
        index: m,
        id: data[index]?.id,
        image: data[index]?.image,
        answer: data[index]?.answer,
      });
      m++;

      if (index == cardLenght - 1) {

        setCardLenght(cardLenght + n);
        break;
      }
    }

    setRandomCards(myArray.sort(() => Math.random() - 0.5));
  }

  const renderItem = ({ item }) => {

    const onPressItem = () => {
      if (!firstCard) {
        setFirstCard(item);
      }
      else if (firstCard) {
        setSecondCard(item);
        if (firstCard?.id == item?.id) {
          setFinishCard(prev => {
            return [
              ...prev,
              firstCard?.index,
              item?.index
            ]
          });
          setAllCard(prev => {
            return [
              ...prev,
              firstCard?.index,
              item?.index
            ]
          });
          setFirstCard(null);
          setSecondCard(null);
        }
        else if (firstCard?.id != item?.id) {
          setMessage(2);
          setMessageText(strings['Не правильно']);
          setFirstCard(null);
          setSecondCard(null);
        }
        else {
          setMessage(2);
          setMessageText(strings['Не правильно']);
          setFirstCard(null);
          setSecondCard(null);
        }
      }
    }

    const isSelected = () => {
      if (item?.index == firstCard?.index || item?.index == secondCard?.index) {
        return styles.itemActive;
      }
      else {
        for (let index = 0; index < finishCard.length; index++) {
          if (finishCard[index] == item?.index) {
            return styles.itemDeActive;
          }

        }
      }
    }

    const isDisabled = () => {
      if (item?.index == firstCard?.index || item?.index == secondCard?.index) {
        return false;
      }
      else {
        for (let index = 0; index < finishCard.length; index++) {
          if (finishCard[index] == item?.index) {
            return true;
          }

        }
      }
    }
    return <TouchableOpacity style={[styles.itemCard, isSelected()]} onPress={() => onPressItem()} disabled={isDisabled()}>
      {item?.image ? <Image style={styles.itemImage} source={{ uri: item?.image }} /> : <Text style={styles.itemText}>{item?.question}</Text>}
    </TouchableOpacity>
  }







  console.log('--->', message);
  return <View style={styles.view}>
    <FormTitle style={styles.title} title={strings["Найди пару"]} text={'Время: ' + seconds} />
    <FlatList
      data={randomCards}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(_, index) => index}
    />
    <ModalMessage setValue={setMessage} value={message ? true : false}>
      {message == 1 ?
        <FormTitle title={messageText} /> :
        message == 2 ? <FormTitle title={messageText} /> : null
      }
    </ModalMessage>
  </View>
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 12
  },


  //item
  itemCard: {
    height: HEIGHT / 6 - 16,
    width: WIDTH / 2 - 32,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: APP_COLORS.PRIMARY_COLOR + '90',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    height: '100%',
    width: '100%',
  },
  itemText: {
    ...setFontStyles(18, '700', APP_COLORS.TEXT_COLOR_WHITE),
  },
  itemActive: {
    borderWidth: 3,
    borderColor: APP_COLORS.PRIMARY_COLOR,
  },
  itemDeActive: {
    backgroundColor: 'green',
    borderWidth: 4,
    borderColor: 'green',
  },
});

export default SameCardScreen;
