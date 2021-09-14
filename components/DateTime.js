import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WeatherItem = ({title, value, unit}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weatherItemText}>{title} :</Text>
            <Text style={styles.weatherItemText}>{value} {unit}</Text>
        </View>
    );
}

const DateTime = ({current,lat ,long ,timezone}) => {
    const [date, setDate] = useState(' ');
    const [time, setTime] = useState(' ');

    useEffect(() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn24HrFormat = hour >=13 ? hour %12 : hour;
            const minutes =  time.getMinutes();
            const ampm =  hour >= 12 ? 'PM' : 'AM';

            setTime((hoursIn24HrFormat < 10 ? '0' + hoursIn24HrFormat : hoursIn24HrFormat) + ':' + (minutes < 10 ? '0' + minutes: minutes) + ' ' + ampm);
            setDate(days[day] + ', ' + date + ' ' + months[month]);
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.heading}>{time}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>{date}</Text>
                </View>
                <View style={styles.weatherItemContainer}>
                    <WeatherItem title="Humidity" value={current ? current.humidity : ''} unit="%"/>
                    <WeatherItem title="Pressure" value={current ? current.pressure : ''} unit="hPA"/>
                    <WeatherItem title="Wind Speed" value={current ? current.wind_speed : ''} unit="km/h"/>
                    <WeatherItem title="Sunrise" value={current ? moment.tz(current.sunrise * 1000, timezone).format('hh:mm a') : ''} unit=""/>
                    <WeatherItem title="Sunset" value={current ? moment.tz(current.sunset * 1000, timezone).format('hh:mm a') : ''} unit=""/>
                </View>
            </View>
            <View style={styles.timezoneContainer}>
                <Text style={styles.timezone}>{timezone}</Text>
                <Text style={styles.latlong}>{lat} {long}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
    },
    heading: {
        fontSize: 45,
        color: "white",
        fontWeight: '100',
    },
    subHeading: {
        fontSize: 25,
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
});

export default DateTime;
