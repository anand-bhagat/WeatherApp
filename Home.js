import React, { useState } from 'react';
import { Text, Box, Input, FormControl, Button, AlertDialog, Center, VStack, HStack, Alert, IconButton, CloseIcon} from 'native-base';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherReport from './components/WeatherReport';

const Stack = createStackNavigator();

const Home = () => {
	const navigation = useNavigation();
	
	const [farms, setFarms] = useState([]);

	const getFarms = async() => {
		try {
			const value = await AsyncStorage.getItem('@farms');
			if(value !== null) {
				setFarms(JSON.parse(value));
			}
		} catch(e) {
			// error reading value
		}
	};

	useEffect(() =>{
		navigation.addListener('focus', () => {
			getFarms();
		});
	},[navigation]);
    
    return (
        <Box height="100%">
			{farms.length == 0 && (
				<Box p={3}>
					<Center>
						You have no farms.
					</Center>
					<Button onPress={() => {navigation.navigate("Add Farm")}} mt={5} colorScheme="cyan" shadow={3}>
						Add Farm
					</Button>
				</Box>
			)}

			{farms.length > 0 && (
				<Box direction="column" style={styles.parent} p={1}>
					{farms.map((farm, index) => {
						return (
							<Box style={styles.child} key={index}>
								<Button onPress={() => {navigation.navigate("Weather Report",farm)}} m={2} colorScheme="cyan" shadow={3}>
									{farm.farmName}
								</Button>
							</Box>
						)
					})}
					<Box style={{ flexBasis: "100%" }} >
						<Button onPress={() => {navigation.navigate("Add Farm")}} m={2} colorScheme="cyan" shadow={3}>
							Add New Farm
						</Button>
					</Box>
				</Box>
			)}
			
        </Box>
    );
};

const styles = StyleSheet.create({
    parent: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	child: {
		flexBasis: '50%',
	}
});

export default Home;
