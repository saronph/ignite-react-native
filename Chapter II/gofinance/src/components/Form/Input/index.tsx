import React from 'react';
import { TextInputProps } from 'react-native';

import * as S from './styles';

interface Props extends TextInputProps {
  error: string;
}

const Input = ({error, ...rest}: Props) => {
  return (
  <S.Container error={error} {...rest} />
  );
}

export default Input;