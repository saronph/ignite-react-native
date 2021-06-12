import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import Input from '../Input';

import * as S from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

const InputForm = ({ control, name, error, ...rest }: Props) => {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input 
            onChangeText={onChange}
            value={value}
            error={error}
            {...rest}
          />
        )}
        name={name as any}
      /> 
      {error && <S.Error>{error}</S.Error>}    
    </S.Container>
  );
}

export default InputForm;
