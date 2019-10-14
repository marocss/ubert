import React from 'react';
import { View } from 'react-native';

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
} from './styles';

import uberx from '../../assets/uberx.png';

export default function Details({ min }) {
  function calculatePrice() {
    return (min * 1.45).toFixed(2);
  }
  return (
    <Container>
      <TypeTitle>Popular</TypeTitle>
      <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

      <TypeImage source={uberx} />
      <TypeTitle>UberX</TypeTitle>
      <TypeDescription>R$ {calculatePrice()}</TypeDescription>

      <RequestButton onPress={() => {}}>
        <RequestButtonText>Solicitar UberX</RequestButtonText>
      </RequestButton>
    </Container>
  );
}
