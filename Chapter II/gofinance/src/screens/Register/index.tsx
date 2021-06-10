import React from 'react';

import Input from '../../components/Form/Input';

import * as S from './styles';

const Register = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <Input 
          placeholder="Nome"
        />

        <Input 
          placeholder="Valor"
        />
      </S.Form>
    </S.Container>
  );
}

export default Register;