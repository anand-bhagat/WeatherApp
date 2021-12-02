import moment from 'moment-timezone';
import { HStack, View, Text, Image, VStack, ScrollView, Center } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';


const WeatherItem = ({title, value, unit}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weatherItemText}>{title} :</Text>
            <Text style={styles.weatherItemText}>{value} {unit}</Text>
        </View>
    );
}

const CurrentWeatherDetails = ({current,lat ,long ,timezone, hourly}) => {

    const drop_icon = require('../assets/images/drop_icon.png');
    const wind_icon = require('../assets/images/wind_icon.png');

    return (
        <View style={styles.container}>
            <HStack space={3} alignItems="center">
                <View padding={3}  width="54%" >
                    <View>
                        <Text style={styles.heading}>{moment().format('hh:mm a')}</Text>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>{moment().format('dddd, Do MMM')}</Text>
                        <Text color="white">{timezone}</Text>
                        <Text color="white">{lat} {long}</Text>
                    </View>
                </View>
                <View flexDirection="row" justifyContent="flex-end" textAlign="right" width="40%" padding={3}>
                    <View>
                        {current && <Image source={{uri: `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}} style={styles.tempImg} align="right" alt="temp"/>}
                        <Text color="white" textAlign="center">{current?.weather[0].main}</Text>
                        <Text color="white" textAlign="center" style={{ textTransform: "capitalize" }}>{current?.weather[0].description} </Text>
                    </View>
                </View>
            </HStack>
            <HStack flexDirection="row" justifyContent="space-between">
                <View padding={2} width="45%">
                    <WeatherItem title="Humidity" value={current ? current.humidity : ''} unit="%"/>
                    <WeatherItem title="Pressure" value={current ? current.pressure : ''} unit="hPA"/>
                    <WeatherItem title="Wind Speed" value={current ? current.wind_speed : ''} unit="km/h"/>
                    <WeatherItem title="Sunrise" value={current ? moment.tz(current.sunrise * 1000, timezone).format('hh:mm a') : ''} unit=""/>
                    <WeatherItem title="Sunset" value={current ? moment.tz(current.sunset * 1000, timezone).format('hh:mm a') : ''} unit=""/>
                </View>
                <View padding={2} width="45%">
                    <WeatherItem title="Clouds" value={current ? current.clouds : ''} unit="%"/>
                    <WeatherItem title="UV index" value={current ? current.uvi : ''} unit=""/>
                    <WeatherItem title="Visibility" value={current ? current.visibility : ''} unit="Meters"/>
                    <WeatherItem title="Temperature" value={current ? current.temp : ''} unit="Celsius"/>
                    <WeatherItem title="Feels Like" value={current ? current.feels_like : ''} unit="Celsius"/>
                </View>
            </HStack>
            <ScrollView horizontal={true}>
                <HStack flexDirection="row" space={2} padding={2}>
                    {
                        hourly && hourly.length > 0 ? 

                        hourly.map((item,idx) => {
                            return(
                                <VStack padding={2} bgColor="white" borderRadius={8} key={idx}>
                                    <Text textAlign="center">{moment.tz(item.dt * 1000, timezone).format('Do MMM')}</Text>
                                    <Text textAlign="center">{moment.tz(item.dt * 1000, timezone).format('H:m')}</Text>
                                    <Center>
                                        <Image source={{uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}} style={{ width:50, height: 50 }} align="right" alt="temp"/>
                                    </Center>
                                    <HStack  flexDirection="row" justifyContent="space-between">
                                        <Image source={drop_icon} style={{ width: 20, height: 20 }} align="center" alt="drop"/>
                                        <Text textAlign="center">{Math.round(item.pop * 100)}%</Text>
                                    </HStack>
                                    <HStack  flexDirection="row" justifyContent="space-between" marginTop={2}>
                                        <Image source={wind_icon} style={{ width: 20, height: 20 }} align="center" alt="drop" marginRight={1} />
                                        <Text textAlign="center">{item.wind_speed} km/h</Text>
                                    </HStack>
                                </VStack>
                            );
                        })
                        :
                        <View />
                    }
                </HStack>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
    },
    heading: {
        fontSize: 45,
        color: "white",
        fontWeight: '100',
        textTransform: "uppercase",
    },
    subHeading: {
        fontSize: 24,
        color: "white",
        fontWeight: '300',
    },
    timezoneContainer: {
        marginTop: 20,
    },  
    timezone: {
        fontSize: 20,
        color: 'white',
    },
    latlong: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
    },
    weatherItemContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherItemText: {
        color: "white",
        fontSize: 14,
        fontWeight: '300'
    },
    tempImg: {
        width: 100,
        height: 100,
    },
});

export default CurrentWeatherDetails;
