import { whileStatement } from '@babel/types';
import moment from 'moment-timezone';
import { Center, HStack } from 'native-base';
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

const WeatherScroll = ({weatherData, timezone}) => {
    return (
        <View style={styles.scrollViewContainer}>
            <ScrollView horizontal={true} style={styles.scrollView}>
                {
                    weatherData && weatherData.length > 0 ? 

                    weatherData.map((data,idx) => {
                        return(
                            <DailyForecastItem data={data ? data : {}} timezone={timezone ? timezone : ""} key={idx} />
                        );
                    })
                    :
                    <View />
                }
            </ScrollView>
        </View>
    )
}

const DailyForecastItem = ({data, timezone}) => {
    if(data && data.weather){
        const img = {uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`};

        return(
            <HStack style={styles.currentTempContainer} marginRight={3} >
                <Center width="50%">
                    <Image source={img} style={styles.currentTempImg}/>
                    <Text style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                </Center>
                <Center width="50%">
                    <WeatherItem title="Humidity" value={data ? data.humidity : ''} unit="%"/>
                    <WeatherItem title="Pressure" value={data ? data.pressure : ''} unit="hPA"/>
                    <WeatherItem title="Wind Speed" value={data ? data.wind_speed : ''} unit="km/h"/>
                    <WeatherItem title="Sunrise" value={data ? moment.tz(data.sunrise * 1000, timezone).format('hh:mm a') : ''} unit=""/>
                    <WeatherItem title="Sunset" value={data ? moment.tz(data.sunset * 1000, timezone).format('hh:mm a') : ''} unit=""/>

                    <WeatherItem title="Clouds" value={data ? data.clouds : ''} unit="%"/>
                    <WeatherItem title="UV index" value={data ? data.uvi : ''} unit=""/>
                    <WeatherItem title="Temp Min" value={data ? data.temp.min : ''} unit="Celsius"/>
                    <WeatherItem title="Temp Max" value={data ? data.temp.max : ''} unit="Celsius"/>
                    <WeatherItem title="Rain Probability" value={data ? data.pop * 100 : ''} unit="%"/>
                </Center>
            </HStack>
        );
    }else{
        return(
            <View >
            </View>
        );
    }
    
}

const WeatherItem = ({title, value, unit}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weatherItemText}>{title} : </Text>
            <Text style={styles.weatherItemText}>{value} {unit}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 0.8,
        padding: 30,
    },
    scrollView: {
        flex: 0.4,
    },
    currentTempImg: {
        width: 150,
        height: 150,
    },
    currentTempContainer: {
        backgroundColor: '#00000055',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        padding: 15,
        width: 300
    },
    day:{
        fontSize: 20,
        color: 'white',
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign: "center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },
    temp: {
        fontSize: 16,
        color: "white",
        fontWeight: '100',
        textAlign: 'center',
    },
    currentTempTextContainer: {
        paddingRight: 40
    },
    futureForecastImg: {
        width: 100,
        height: 100,
    },
    futureForecastItemContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        padding: 20,
        marginLeft: 10,
    },
    forecastContainer: {
        flexDirection: 'row',
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
});

export default WeatherScroll;
