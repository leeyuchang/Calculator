/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {CalcButton} from './CalcButton';

const Calc = () => {
  const [exp, setExp] = useState('0.00');
  const [equation, setEquation] = useState('');

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equation]);

  const isOperator = character => {
    return ['+', '-', '*', '/', '.'].indexOf(character) > -1;
  };

  // eslint-disable-next-line no-shadow
  const isPrevDot = equation => {
    const lastChar = equation.charAt(equation.length - 1);
    return ['+', '-', '*', '/', '.'].indexOf(lastChar) > -1;
  };

  // eslint-disable-next-line no-new-func
  const looseJsonParse = obj => Function('"use strict";return (' + obj + ')')();

  const append = character => {
    if (equation === '') {
      // 0인 경우(처음 상태)
      if (!isOperator(character)) {
        // 숫자인경우
        setEquation(character);
      } else {
        // 연산자인 경우(. / * - +)
        return;
        // Do nothing, just ignore
      }
    } else {
      // 0이 아닌겨우(값이 있는 상태)
      if (!isOperator(character)) {
        // 숫자인경우
        setEquation(prev => prev + character);
      } else {
        // 연산자인 경우(. / * - +)
        if (!isPrevDot(equation)) {
          setEquation(prev => prev + character);
        }
      }
    }
  };

  const calculate = () => {
    try {
      // Ref : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
      setExp(looseJsonParse(`{exp:${equation}}`)?.exp ?? '0');
    } catch (error) {
      // Do nothing, just ignore
    }
  };

  // When pressed '+/-'
  const calculateToggle = () => {
    if (equation !== '' && !isPrevDot(equation)) {
      setEquation(equation.concat('*-1'));
    }
  };

  // When pressed '%'
  const calculatePercentage = () => {
    if (equation !== '' && !isPrevDot(equation)) {
      setEquation(equation + '*0.01');
    }
  };

  // When pressed 'C'
  const clear = () => {
    setEquation('');
    setExp('0');
  };

  const backspace = () => {
    setEquation(prev => prev?.substr(0, prev.length - 1) ?? 0);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: 100,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text style={{fontSize: 40}}>
          {numberWithCommas(Number(exp).toFixed(2))}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          height: 50,
          backgroundColor: '#fff',
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
            onPress={e => append('/')}
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
              append('*');
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

          {/* &larr; &leftarrow; &LeftArrow; &slarr; &ShortLeftArrow; */}

          <CalcButton
            title="←"
            color="#fff"
            backgroundColor="#DCA394"
            onPress={backspace}
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
