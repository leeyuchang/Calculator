/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Calc from './Calc';
import {} from 'react/cjs/react.production.min';

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
  const [myTextInput, setMyTextInput] = useState(10);
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
      <View>
        <Text
          style={{
            fontSize: 25,
            marginVertical: 10,
            height: 60,
            padding: 10,
            backgroundColor: '#fff',
          }}>
          {myTextInput}
        </Text>
        <TextInput value={myTextInput.toString()} />
      </View>
    </NavigationContainer>
  );
}
