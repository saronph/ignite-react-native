import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import GoogleLogo from '../../assets/google.svg';
import AppleLogo from '../../assets/apple.svg';
import SignInSocialButton from '../../components/SignInSocialButton';

import { useAuth } from '../../hooks/auth';

import * as S from './styles';

const SignIn: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(error);
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

          <SignInSocialButton 
            title="Entrar com Apple"
            svg={AppleLogo}
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}

export default SignIn;