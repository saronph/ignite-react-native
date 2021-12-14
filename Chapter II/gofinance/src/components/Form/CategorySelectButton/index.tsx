import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

const CategorySelectButton = ({ title, onPress, testID }: Props) => {
  return (
    <S.Container onPress={onPress} testID={testID}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
}

export default CategorySelectButton;