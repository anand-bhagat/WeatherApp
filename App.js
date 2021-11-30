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
import Home from './Home';
import { NativeBaseProvider, Hidden } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

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
const Stack = createStackNavigator();

const App = () => {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={`Root`} component={Root} options={{ headerShown : false }}/>
            <Stack.Screen name={`Weather Report`} component={WeatherReport} options={({ route }) => ({ title: route.params.farmName })}/>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
};

const Root = () => {
  return(
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Add Farm" component={AddFarm} />
    </Drawer.Navigator>
  );
};



export default App;
