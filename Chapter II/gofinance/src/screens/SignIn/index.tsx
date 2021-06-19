import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import GoogleLogo from '../../assets/google.svg';
import AppleLogo from '../../assets/apple.svg';
import SignInSocialButton from '../../components/SignInSocialButton';

import { useAuth } from '../../hooks/auth';

import * as S from './styles';

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } 
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple()
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }     
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <Logo 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <S.Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleLogo}
            onPress={handleSignInWithGoogle}
          />

          {
            Platform.OS === 'ios' &&
            <SignInSocialButton 
              title="Entrar com Apple"
              svg={AppleLogo}
              onPress={handleSignInWithApple}
            />
          }
        </S.FooterWrapper>

        { isLoading && <ActivityIndicator color={theme.colors.shape} size='large' /> }
      </S.Footer>
    </S.Container>
  );
}

export default SignIn;