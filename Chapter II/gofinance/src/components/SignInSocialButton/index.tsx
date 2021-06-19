import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>
}

const SignInSocialButton: React.FC<Props> = ({
  title, 
  svg: Svg, 
  ...rest
}) => {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Text>
        {title}
      </S.Text>
    </S.Button>
  );
}

export default SignInSocialButton;