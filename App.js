/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import {Text, View, Button} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WeatherReport from './components/WeatherReport';
import AddFarm from './AddFarm';
import { NativeBaseProvider } from 'native-base';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const App = () => {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Add Farm">
            <Drawer.Screen name="Home" component={WeatherReport} />
            <Drawer.Screen name="Add Farm" component={AddFarm} />
          </Drawer.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
};



export default App;
