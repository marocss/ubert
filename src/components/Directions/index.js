import React from 'react';
import { View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import apiKey from '../../services/apiKey';

// import { Container } from './styles';

export default function Directions({ destination, origin, onReady }) {
  return (
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey={apiKey}
      strokeWidth={3}
      strokeColor="#111"
    />
  );
}
