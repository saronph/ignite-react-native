import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  error: string;
}

export const Container = styled(TextInput)<Props>`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  ${(props) => props.error ? css`
    margin: 0;
  ` : css`
    margin-bottom: 8px;
  `};
`;
