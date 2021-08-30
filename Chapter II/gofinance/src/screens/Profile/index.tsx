import React from 'react';
import { TextInput, Button } from 'react-native';

import * as S from './styles';

export default function Profile() {
  return (
    <S.Container>
      <S.Title testID="text-title">Perfil</S.Title>

      <TextInput 
        testID='input-name'
        placeholder="Nome"
        autoCorrect={false}
        value="Saron"
      />

      <TextInput 
        testID='input-surname'
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Medeiros"
      />

      <Button 
        title='Salvar'
        onPress={() => {}}
      />
    </S.Container>
  );
}