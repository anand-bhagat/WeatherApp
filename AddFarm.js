import React, { useState } from 'react';
import { Stack, Text, Box, Input, FormControl, Button, AlertDialog, Center, VStack, HStack, Alert, IconButton, CloseIcon} from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import { PermissionsAndroid, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const AddFarm = ({navigation}) => {

	const [farms, setFarms] = useState([]);
	const [successAlert, setSuccessAlert] = useState(false);
	const [isFarmSaving, setIsFarmSaving] = useState(false);
    const [position, setPosition] = useState({
      latitude:  20.536846,
      longitude: 76.180870,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    });

    const [marker, setMarker] = useState({
      latitude:  20.536846,
      longitude: 76.180870,
    });

	const [invalid, setInvalid] = useState({
		farmName: false,
		latitude: false,
		longitude: false,
	});

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
			setData({
				farmName: '',
				latitude:  20.536846,
				longitude: 76.180870,
			});
		});
	},[navigation]);

    const handleMapClick = (e) => {
	  setData({ ...formData, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude});
    };

	const [formData, setData] = useState({
		farmName: '',
		latitude:  20.536846,
		longitude: 76.180870,
	  });

	const onSubmit = async () => {
		setIsFarmSaving(true);
		if(validate()){
			if(farms){
				await AsyncStorage.setItem('@farms', JSON.stringify([...farms, formData]));
				setFarms([...farms, formData]);
			}else{
				await AsyncStorage.setItem('@farms', JSON.stringify([formData]));
				setFarms([formData]);
			}
			setData({
				farmName: '',
				latitude:  20.536846,
				longitude: 76.180870,
			});
			setSuccessAlert(true);
		}
		setIsFarmSaving(false);
	};

	const validate = () => {
		if (formData.farmName === undefined || formData.farmName === "") {
		  setInvalid({
			...invalid,
			farmName: {flag: true, message: 'Please enter a Farm name for identification of farms.'},
		  });
		  return false;
		} else if (formData.farmName.length < 3) {
		  setInvalid({
			...invalid,
			farmName: {flag: true, message:'Farm Name is too short.'},
		  });
		  return false;
		}
		return true;
	};
    
    return (
		<ScrollView>
			<Stack space={0}>
				<Box p={3}>
					<FormControl isRequired isInvalid={invalid.farmName.flag}>
						<FormControl.Label>Enter a Farm Name</FormControl.Label>
						<Input
							w="100%"
							placeholder="Farm Name"
							_light={{
								placeholderTextColor: "blueGray.900",
							}}
							_dark={{
								placeholderTextColor: "blueGray.400",
							}}
							backgroundColor="white"
							isRequired={true}
							onChangeText={(value) => setData({ ...formData, farmName: value })}
						/>
						<FormControl.ErrorMessage>
							{invalid.farmName.message}
						</FormControl.ErrorMessage>
					</FormControl>
				</Box>
				<Box bg="primary.400" shadow={3} width="100%" height={400}>
					<MapView
					provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={styles.map}
					initialRegion={position}
					showsUserLocation={true}
					loadingEnabled={true}
					onPress={handleMapClick}
					toolbarEnabled={false}
					>
						<Marker
							key="new_farm"
							coordinate={{ latitude: formData.latitude, longitude: formData.longitude}}
							title="New Farm"
							description="farm"
						/>
					</MapView>
				</Box>
				<Stack direction="column">
					<Stack pl={3} pr={6} pt={3} direction="row" space={3}>
						<Box bg="primary.400" rounded="md" shadow={3} width="50%" py={4} px={2}>
							<Text  mb={0} color="white"> Latitude : {formData.latitude.toFixed(8)}</Text>
						</Box>
						<Box bg="primary.400" rounded="md" shadow={3} width="50%" py={4} px={2}>
							<Text  mb={0} color="white"> Longitude : {formData.longitude.toFixed(8)}</Text>
						</Box>
					</Stack>
				</Stack>
				<Box px={3} >
					<Button onPress={onSubmit} mt="5" colorScheme="cyan" shadow={3} isLoading={isFarmSaving}>
						Submit
					</Button>
				</Box>
				<SuccessAlertDialog isOpen={successAlert} setSuccessAlert={setSuccessAlert} />
			</Stack>
		</ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: "100%",
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});

const SuccessAlertDialog = ({isOpen, setSuccessAlert}) => {
	const navigation = useNavigation();
  
	const onClose = () => {setSuccessAlert(false); navigation.navigate('Home');};
	
  
	const cancelRef = React.useRef(null)
	return (
	  <Center>
		<AlertDialog
		  leastDestructiveRef={cancelRef}
		  isOpen={isOpen}
		  onClose={onClose}
		>
			<AlertDialog.Content padding={0} margin={0}>
				<AlertDialog.Body padding={0} margin={0}>
					<Alert w="100%" status="success" margin={0} padding={5} hide>
						<VStack space={2} flexShrink={1} w="100%">
							<HStack flexShrink={1} space={2} justifyContent="space-between">
								<HStack space={2} flexShrink={1}>
									<Alert.Icon mt="1" />
									<Text fontSize="md" color="coolGray.800">
										Farm is added successfully.
									</Text>
								</HStack>
								<IconButton
								variant="unstyled"
								icon={<CloseIcon size="3" color="coolGray.600" />}
								onPress={onClose}
								/>
							</HStack>
						</VStack>
					</Alert>
				</AlertDialog.Body>
			</AlertDialog.Content>
		</AlertDialog>
	  </Center>
	)
};

export default AddFarm;
