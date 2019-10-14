import React from 'react';
import { StatusBar } from 'react-native';

// import { Container } from './styles';

import Map from './components/Map';

export default function MyApp() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Map />
    </>
  );
}
