import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useState} from 'react';
import {colors, fonts, sizes, weights} from '../../theme/theme';

const Counter = () => {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(value + 1);
  };
  const decrement = () => {
    setValue(value - 1);
    if (value < 1) {
      setValue(0);
    }
  };


  return (
    <View style={styles.counter}>
      <Pressable
        style={[styles.button, {borderColor: '#fabecf'}]}
        onPress={decrement}
      >
        <Text style={styles.counterText}>-</Text>
      </Pressable>
      <Text style={[styles.counterText, {padding: 10}]}>{value}</Text>
      <Pressable
        style={[styles.button, {borderColor: colors.primary}]}
        onPress={increment}>
        <Text style={styles.counterText}>+</Text>
      </Pressable>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
    height: 50,
    paddingBottom: 10

  },
  counterText: {
    fontSize: sizes.xl,
    fontFamily: fonts.primary,
    fontWeight: weights.bold,
    alignSelf: 'center',
    
  },
  button: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    width: 50
  }
})