import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export function CalcButton({title, color, backgroundColor, flex, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}, {flex}]}
      onPress={() => onPress(title)}>
      <Text style={[styles.text, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 4,
    padding: 0,
    color: '#999',
    height: 80,
    width: 80,
    alignItems: 'center',
    backgroundColor: '#999',
    borderRadius: 50,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
