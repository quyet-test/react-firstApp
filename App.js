import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, FlatList } from 'react-native';
import * as Font from 'expo-font';

import GoalItem from './components/GoalItem';
import ProductInput from './components/ProductInput';

import BarcodeReader from './components/barcodeScanner'


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [scanBarcode, setScanBarcode] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  const addGoalHandler = goalTitle => {
    if (typeof (goalTitle) === 'string' && goalTitle.length > 0) {
      setCourseGoals(currentGoals => [...courseGoals, { id: Math.random().toString(), value: goalTitle }]);
    }

    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  const cancelScanBarcodeHandler = () => {
    setScanBarcode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Update Product Position" onPress={() => setIsAddMode(true)} />
      <Button title="Scan Barcode" onPress={() => setScanBarcode(true)} />
      <BarcodeReader
        visible={scanBarcode}
        onCancel={cancelScanBarcodeHandler} />
      <ProductInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
