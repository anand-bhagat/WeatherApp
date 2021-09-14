import { whileStatement } from '@babel/types';
import moment from 'moment-timezone';
import React from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';

const WeatherScroll = ({weatherData}) => {
    return (
        <View style={styles.scrollViewContainer}>
            <ScrollView horizontal={true} style={styles.scrollView}>
                <CurrentTempEl data={weatherData ? weatherData[0] : {}}/>
                <FutureForecast data={weatherData ? weatherData : {}}/>
            </ScrollView>
        </View>
    )
}

const CurrentTempEl = ({data}) => {
    if(data && data.weather){
        const img = {uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`};

        return(
            <View style={styles.currentTempContainer}>
                <Image source={img} style={styles.currentTempImg}/>
                <View style={styles.currentTempTextContainer}>
                    <Text style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Text style={styles.temp}>Night - {data.temp.night}&#176;C</Text>
                    <Text style={styles.temp}>Day - {data.temp.day}&#176;C</Text>
                </View>
            </View>
        );
    }else{
        return(
            <View >
            </View>
        );
    }
    
}

const FutureForecast = ({data}) => {
    return (
        <View style={styles.forecastContainer}>
            {
                data && data.length > 0 ? 

                data.map((item,idx) => {
                    return(
                        idx !== 0 && <FutureForecastItem key={idx} item={item}/>
                    );
                })
                :
                <View />
            }
        </View>
    );
}

const FutureForecastItem = ({item}) => {
    const img = {uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`};
    return (
        <View style={styles.futureForecastItemContainer}>
            <Text style={styles.day}>{moment(item.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.futureForecastImg}/>
            <Text style={styles.temp}>Night - {item.temp.night}&#176;C</Text>
            <Text style={styles.temp}>Day - {item.temp.day}&#176;C</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#18181bcc',
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
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        padding: 15,
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
    }
});

export default WeatherScroll;
