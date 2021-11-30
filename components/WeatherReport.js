/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Box, Center, Heading, HStack, NativeBaseProvider, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import DateTime from './DateTime';
import WeatherScroll from './WeatherScroll';

const img = require('../assets/images/background.jpg');
const API_KEY = 'b0bbe55801bc593afb60e30fc481122b';

const WeatherReport = ({route, navigation}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { latitude, longitude } = route.params;

    // Geolocation.getCurrentPosition(dataa=>console.warn(dataa));
    
    useEffect(() => {
        fetchDataFromApi(latitude, longitude);
    },[]);


    const fetchDataFromApi = async (latitude, longitude) => {
        setLoading(true);
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            setData(data);
        });
        setLoading(false);
    }

    return (
        <>
          {loading && 
            <Center flex={1} px="3">
              <HStack space={2} alignItems="center">
                <Spinner accessibilityLabel="Loading" />
                <Heading color="primary.500" fontSize="md">
                  Loading
                </Heading>
              </HStack>
            </Center>
          }
          {!loading && 
            <View style={styles.container}>
                <ImageBackground source={img} style={styles.image}>
                    <View style={styles.content}>
                        <DateTime current={data.current} lat={data.lat} long={data.lon} timezone={data.timezone}/>
                        <WeatherScroll weatherData={data.daily}/>
                    </View>
                </ImageBackground>
            </View>
          }
      </>
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

export default WeatherReport;
