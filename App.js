/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Box, NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import { ImageBackground, StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';
import Geolocation from '@react-native-community/geolocation';
import RNLocation from 'react-native-location';

const img = require('./assets/images/background.jpg');
const API_KEY = 'b0bbe55801bc593afb60e30fc481122b';
const App = () => {
    const [data, setData] = useState([]);

    // Geolocation.getCurrentPosition(dataa=>console.warn(dataa));
    
    useEffect(() => {
        fetchDataFromApi(20.536846, 76.180870);
    },[]);


    const fetchDataFromApi = (latitude, longitude) => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            setData(data);
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={img} style={styles.image}>
                <View style={styles.content}>
                    <DateTime current={data.current} lat={data.lat} long={data.lon} timezone={data.timezone}/>
                    <WeatherScroll weatherData={data.daily}/>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  image:{
    flex:1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    height:"100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    color:"white",
  }
});

export default App;
