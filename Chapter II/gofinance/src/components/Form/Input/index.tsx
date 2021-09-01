import React from 'react';
import { TextInputProps } from 'react-native';

import * as S from './styles';

interface Props extends TextInputProps {
  active?: boolean;
  error: string;
}

const Input = ({ active = false, error, ...rest}: Props) => {
  return (
  <S.Container active={active} error={error} {...rest} />
  );
}

export default Input;