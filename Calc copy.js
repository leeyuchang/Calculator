/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {CalcButton} from './CalcButton';

const Calc = () => {
  const [equation, setEquation] = useState('0');
  const [isDecimalAdded, setIsDecimalAdded] = useState(false);
  const [isOperatorAdded, setIsOperatorAdded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const isOperator = character => {
    return ['+', '-', '×', '÷'].indexOf(character) > -1;
  };

  const append = character => {
    // Start
    if (equation === '0' && !isOperator(character)) {
      if (character === '.') {
        setEquation(equation + '' + character);
        setIsDecimalAdded(true);
      } else {
        setEquation('' + character);
      }

      setIsStarted(true);
      return;
    }

    // If Number
    if (!isOperator(character)) {
      if (character === '.' && isDecimalAdded) {
        return;
      }

      if (character === '.') {
        setIsDecimalAdded(true);
        setIsOperatorAdded(true);
      } else {
        setIsOperatorAdded(false);
      }

      setEquation(equation + '' + character);
    }

    // Added Operator
    if (isOperator(character) && !isOperatorAdded) {
      setEquation(equation + '' + character);
      setIsDecimalAdded(false);
      setIsOperatorAdded(true);
    }
  };

  // When pressed '='
  const calculate = () => {
    let result = equation
      .replace(new RegExp('×', 'g'), '*')
      .replace(new RegExp('÷', 'g'), '/');

    // eslint-disable-next-line no-eval
    setEquation(parseFloat(eval(result).toFixed(9)).toString());
    setIsDecimalAdded(false);
    setIsOperatorAdded(false);
  };

  // When pressed '+/-'
  const calculateToggle = () => {
    if (isOperatorAdded || !isStarted) {
      return;
    }

    setEquation(equation + '* -1');
    calculate();
  };

  // When pressed '%'
  const calculatePercentage = () => {
    if (isOperatorAdded || !isStarted) {
      return;
    }

    setEquation(equation + '* 0.01');
    calculate();
  };

  // When pressed 'C'
  const clear = () => {
    setEquation('0');
    setIsDecimalAdded(false);
    setIsOperatorAdded(false);
    setIsStarted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: 100,
          // backgroundColor: '#999',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40}}>{equation}</Text>
      </View>
      <ScrollView>
        <View style={styles.buttonRow}>
          <CalcButton
            title="C"
            color="#fff"
            backgroundColor="#DCC894"
            onPress={clear}
          />
          <CalcButton
            title="±"
            color="#fff"
            backgroundColor="#DCC894"
            onPress={calculateToggle}
          />
          <CalcButton
            title="%"
            color="#fff"
            backgroundColor="#DCC894"
            onPress={calculatePercentage}
          />
          <CalcButton
            title="÷"
            color="#fff"
            backgroundColor="#DCA394"
            onPress={e => append('÷')}
          />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton
            title="7"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="8"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="9"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="×"
            color="#fff"
            backgroundColor="#DCA394"
            onPress={() => {
              append('×');
            }}
          />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton
            title="4"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="5"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="6"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="-"
            color="#fff"
            backgroundColor="#DCA394"
            onPress={e => append('-')}
          />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton
            title="1"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="2"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="3"
            color="#fff"
            backgroundColor="#607D8B"
            onPress={e => append(e)}
          />
          <CalcButton
            title="+"
            color="#fff"
            backgroundColor="#DCA394"
            onPress={() => append('+')}
          />
        </View>

        <View style={styles.buttonRow}>
          <CalcButton
            title="0"
            color="#fff"
            backgroundColor="#607D8B"
            flex={2}
            onPress={e => append(e)}
          />
          <CalcButton
            title="."
            color="#fff"
            backgroundColor="#607D8B"
            onPress={prev => append('.')}
          />
          <CalcButton
            title="="
            color="#fff"
            backgroundColor="#DCA394"
            onPress={calculate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
  },
});

export default Calc;
