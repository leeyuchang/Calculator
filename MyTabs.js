/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Calc from './Calc';
import {Picker} from '@react-native-community/picker';

function HomeScreen(props) {
  return <Calc />;
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const [discountType, setDiscountType] = useState('none');
  const [discountValue, setDiscountValue] = useState('');

  const showUnit = () => {
    switch (discountType) {
      case 'absolute':
        return '$';
      case 'percentage':
        return '%';
      default:
        return '';
    }
  };

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: {fontSize: 20},
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '계산기모드'}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: '상품선택모드'}}
        />
      </Tab.Navigator>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.dicountSelectorContainer}>
          <Text>Discount:</Text>
          <Picker
            itemStyle={{
              backgroundColor: 'grey',
              color: 'blue',
              fontFamily: 'Ebrima',
              fontSize: 50,
            }}
            style={{
              height: 100,
              width: 160,
              placeholderTextColor: '#555',
              fontSize: 50,
            }}
            selectedValue={discountType}
            onValueChange={(val, idx) => setDiscountType(val)}>
            <Picker.Item label="none" value="none" />
            <Picker.Item label="absolute" value="absolute" />
            <Picker.Item label="percentage" value="percentage" />
          </Picker>
        </View>
        {discountType !== 'none' && (
          <View style={styles.discountContainer}>
            <TextInput
              style={styles.discountInput}
              value={numberWithCommas(discountValue)}
              onChangeText={e => setDiscountValue(e.replaceAll(',', ''))}
            />
            <Text style={styles.discountUnit}>{showUnit()}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 100,
    // alignItems: 'center',
    backgroundColor: 'tomato',
    flexDirection: 'row',
  },
  discountContainer: {
    flexDirection: 'row',
  },
  discountInput: {
    borderColor: '#000',
    fontSize: 24,
    color: '#fff',
  },
  discountUnit: {
    fontSize: 24,
    textAlignVertical: 'center',
    color: '#fff',
  },
  dicountSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
