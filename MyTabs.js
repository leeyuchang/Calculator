/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Calc from './Calc';
import {Picker} from '@react-native-community/picker';
function HomeScreen(props) {
  console.log(props);
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
  const [country, setCountry] = useState('japan');
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
      {/* <View style={styles.container}>
        <Picker
          itemStyle={{
            backgroundColor: 'grey',
            color: 'blue',
            fontFamily: 'Ebrima',
            fontSize: 40,
          }}
          style={{
            height: 100,
            width: 150,
            placeholderTextColor: '#555',
            fontSize: 40,
          }}
          selectedValue={country}
          onValueChange={(val, idx) => setCountry(val)}>
          <Picker.Item label="none" value="none" style={{fontSize: 50}} />
          <Picker.Item label="absolute" value="absolute" />
          <Picker.Item label="percentage" value="percentage" />
        </Picker>
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 20,
    // marginBottom: 200,
    alignItems: 'center',
    height: 80,
    // backgroundColor: 'tomato',
  },
});
