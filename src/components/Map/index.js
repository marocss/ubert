import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import { getPixelSize } from '../../utils';

import markerImg from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  BackButton,
  BackButtonImage,
} from './styles';
import apiKey from '../../services/apiKey';

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
});

Geocoder.init(apiKey);

export default function Map() {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);

  const mapViewRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });

        const address = response.results[0].formatted_address;
        // console.log(address)

        const formattedAddress = address.substring(0, address.indexOf('- '));
        // console.log(location);

        setLocation(formattedAddress);

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0643,
          longitudeDelta: 0.0634,
        });
      }, // successo
      () => {}, // erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      } // configurações
    );
  }, []);

  function handleLocationSelected(data, { geometry }) {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;
    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  }

  function handleBack() {
    setDestination(null);
  }

  return (
    <>
      <MapView
        style={styles.mapStyle}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={mapViewRef}
      >
        {destination && (
          <>
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                // console.log(result);
                const windowHeight = Dimensions.get('window').height;

                // height of Details card is 43% of screeen height
                const neededBottomPadding = windowHeight * 0.43 + 85;

                console.log(typeof windowHeight);
                setDuration(Math.floor(result.duration));
                mapViewRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixelSize(85),
                    left: getPixelSize(85),
                    top: getPixelSize(85),
                    bottom: getPixelSize(neededBottomPadding),
                  },
                });
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={markerImg}
            >
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>

            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
              <LocationBox
                style={{ marginTop: Platform.select({ ios: 60, android: 0 }) }}
              >
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>min</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </>
        )}
      </MapView>
      {destination ? (
        <>
          <BackButton onPress={handleBack}>
            <BackButtonImage source={backImage} />
          </BackButton>
          <Details min={duration} />
        </>
      ) : (
        <Search onLocationSelected={handleLocationSelected} />
      )}
    </>
  );
}
