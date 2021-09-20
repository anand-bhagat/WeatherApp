import React, { useState } from 'react';
import { Stack, Text, Box } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';


const AddFarm = () => {

    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    
      useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
          const crd = pos.coords;
          setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          });
        }).catch((err) => {
          console.log(err);
        });
      }, []);

    return (
        <Stack space={2} height="100%">
            <Stack pl={3} pr={5} py={3} direction="row" space={2}>
                <Box bg="primary.400" rounded="md" shadow={3} width="50%" py={4} px={2}>
                    <Text  mb={0} color="white"> Latitude : </Text>
                </Box>
                <Box bg="primary.400" rounded="md" shadow={3} width="50%" py={4} px={2}>
                    <Text  mb={0} color="white"> Longitude : </Text>
                </Box>
            </Stack>
            <Box rounded="md" shadow={3} width="100%" height={400} py={4} px={2}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    initialRegion={position}
                    showsUserLocation={true}
                    ></MapView>
                </Box>
        </Stack>

        
    );
};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: "100%",
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default AddFarm;
