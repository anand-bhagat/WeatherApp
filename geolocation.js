useEffect(() => {
        const requestLocationPermission = async () => {
          if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Location Access Required',
                  message: 'This App needs to Access your location',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                getOneTimeLocation();
              } else {
                console.log('Permission Denied');
              }
            } catch (err) {
              console.warn(err);
            }
          }
        };
        requestLocationPermission();
        return () => {
        //   Geolocation.clearWatch(watchID);
        };
      }, []);

    const getOneTimeLocation = () => {
        console.log('Getting Location ...');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            console.log('You are Here');
    
            // //getting the Longitude from the location json
            // const currentLongitude = 
            //   JSON.stringify(position.coords.longitude);
    
            // //getting the Latitude from the location json
            // const currentLatitude = 
            //   JSON.stringify(position.coords.latitude);
    
            // //Setting Longitude state
            // setCurrentLongitude(currentLongitude);
            
            // //Setting Longitude state
            // setCurrentLatitude(currentLatitude);
          },
          (error) => {
              
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
      };