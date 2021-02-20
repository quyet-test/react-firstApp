import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const MainScreen = props => {
  const [searchingProduct, setSearchingProduct] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const searchingProductHandler = inputText => {
    setSearchingProduct(inputText);
  };

  const searchingBarcodeHandler = () => {
    setSearchingProduct('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    setConfirmed(true);
    setSelectedProduct(searchingProduct);
    setSearchingProduct('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedProduct}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedProduct)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Barcode Demo</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Search Product</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={searchingProductHandler}
            value={searchingProduct}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="BarcodeScan"
                onPress={searchingBarcodeHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default MainScreen;
